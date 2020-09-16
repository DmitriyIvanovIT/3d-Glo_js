const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');

    let count = 0;

    let idOpenPopUp,
        idClosePopUp;

    const openPopUp = () => {
            popup.style.display = 'block';
            idOpenPopUp = requestAnimationFrame(openPopUp);
            if (count < 38) {
                popupContent.style.left = `${count += 2}%`;
            } else {
                cancelAnimationFrame(idOpenPopUp);
            }
        },
        closePopUp = () => {
            idClosePopUp = requestAnimationFrame(closePopUp);
            if (count > 0) {
                popupContent.style.left = `${count -= 2}%`;
            } else {
                popup.style.display = '';
                cancelAnimationFrame(idClosePopUp);
            }
        };

    popupBtn.forEach(item => {
        item.addEventListener('click', () => {
            if (window.screen.width > 768) {
                openPopUp();
            } else {
                popupContent.style.left = '';
                popup.style.display = 'block';
            }
        });
    });

    popup.addEventListener('click', event => {
        const target = event.target;

        if (!target.closest('.popup-content') || target.classList.contains('popup-close')) {
            if (window.screen.width > 768) {
                closePopUp();
            } else {
                popup.style.display = '';
            }
        }
    });
};

export default togglePopUp;