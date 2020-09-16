const valid = () => {
    const inputs = document.querySelectorAll('input.calc-item'),
        phoneInputs = document.querySelectorAll('[type = tel]'),
        textInputs = document.querySelectorAll('[name="user_name"]'),
        textMessage = document.querySelector('[name="user_message"]'),
        forms = document.querySelectorAll('form');

    forms.forEach(item => item.autocomplete = "off");

    const validText = item => {
        item.value = item.value.replace(/[^А-Яа-яЁё ]/i, '');
    };

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener('input', () => {
            phoneInputs.forEach(phoneInput => {
                phoneInput.addEventListener('input', () => {
                    const thisForm = phoneInput.closest('form'),
                        btnForm = thisForm.querySelector('button');

                    const regExp = /^\+?[78]([-()]*\d){10}$/;

                    if (!regExp.test(phoneInput.value)) {
                        phoneInput.style.border = '2px solid red';
                        btnForm.disabled = true;
                    } else {
                        phoneInput.style.border = '';
                        btnForm.disabled = false;
                    }
                });
            });
        });
    });

    inputs.forEach(item => {
        item.addEventListener('input', () => item.value = item.value.replace(/\D/g, ''));
    });

    textInputs.forEach(item => {
        item.addEventListener('input', () => {
            validText(item);
        });
    });

    textMessage.addEventListener('input', () => {
        validText(textMessage);
    });
};
export default valid;