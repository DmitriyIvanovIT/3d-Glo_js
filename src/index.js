// eslint-disable-next-line strict
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import valid from './modules/valid';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('01 october 2020');

// Меню
toggleMenu();

// popup
togglePopUp();
window.addEventListener('resize', togglePopUp);

// табы
tabs();

// Слайдер
slider();

// Изменение фото
changeImage();

// Валидация
valid();

// Калькулятор
calc(100);

// Send-ajax-form
sendForm();
