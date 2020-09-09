const validForm1 = new Validator({
    selector: '#form1',
    pattern: {},
    method: {
        'form1-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form1-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ]
    }
});

validForm1.init();

const validForm2 = new Validator({
    selector: '#form2',
    pattern: {},
    method: {
        'form2-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form2-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'text']
        ]
    }
});

validForm2.init();

const validForm3 = new Validator ({
    selector: '#form3',
    pattern: {},
    method: {
        'form3-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'text']
        ]
    }
});

validForm3.init();
