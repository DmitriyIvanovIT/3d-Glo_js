const sendForm = () => {
    const errorrMessage = 'Что то пошло не так...',
        loadMessage = '<h2 class="animate">Loading</h2>',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem; font-weight: bolder; color: green; 
    text-shadow: 1px 1px 2px black, 0 0 1em black;`;

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.innerHTML = loadMessage;
            const formData = new FormData(form);

            postData(formData)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(`status network ${response.status}!`);
                    }
                    statusMessage.textContent = successMessage;
                    form.reset();
                })
                .catch(error => {
                    statusMessage.textContent = errorrMessage;
                    statusMessage.style.cssText = `font-size: 2rem; font-weight: bolder; color: red; 
                    text-shadow: 1px 1px 2px black, 0 0 1em black;`;
                    console.error(error);
                });

            setTimeout(() => {
                statusMessage.remove();
            }, 8000);
        });
    });
};

export default sendForm;