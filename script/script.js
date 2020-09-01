window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    // Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const addZero = n => (n < 10 ? `0${n}` : n),
            getTimeRemaning = () => {
                const dateStop = new Date(deadline).getTime(),
                    dateNow = new Date().getTime(),
                    timeRemaining = (dateStop - dateNow) / 1000,
                    seconds = Math.floor(timeRemaining % 60),
                    minutes = Math.floor((timeRemaining / 60) % 60),
                    hours = Math.floor(timeRemaining / 60 / 60);

                return {
                    timeRemaining,
                    hours,
                    minutes,
                    seconds
                };
            },
            updateClock = () => {
                const timer = getTimeRemaning();


                const idInterval = setInterval(updateClock, 1000);

                if (timer.timeRemaining > 0) {
                    timerHours.textContent = addZero(timer.hours);
                    timerMinutes.textContent = addZero(timer.minutes);
                    timerSeconds.textContent = addZero(timer.seconds);
                } else {
                    timerHours.textContent = '00';
                    timerMinutes.textContent = '00';
                    timerSeconds.textContent = '00';
                    clearInterval(idInterval);
                }
            };

        updateClock();
    };

    countTimer('01 september 2020');


    // Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            mainBtn = document.querySelector('main>a');

        let count = 100;

        let idOpenMenu,
            idCloseMenu;


        const openMenu = () => {

                idOpenMenu = requestAnimationFrame(openMenu);
                if (count > 0) {
                    menu.style.transform = `translate(-${count -= 10}%)`;
                } else {
                    cancelAnimationFrame(idOpenMenu);
                }
            },
            closeMenu = () => {
                idCloseMenu = requestAnimationFrame(closeMenu);
                if (count < 100) {
                    menu.style.transform = `translate(-${count += 10}%)`;
                } else {
                    cancelAnimationFrame(idCloseMenu);
                }
            },
            actionMenu = () => {
                if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                    if (window.screen.width > 780) {
                        openMenu();
                    } else {
                        menu.style.transform = `translate(0)`;
                    }

                } else {
                    if (window.screen.width > 780) {
                        closeMenu();
                    } else {
                        menu.style.transform = `translate(-100%)`;
                    }
                }
            },
            scrollPage = function(e, elem) {
                e.preventDefault();
                const w = window.pageYOffset,
                    hash = elem.href.replace(/[^#]*(.*)/, '$1');

                const t = document.querySelector(hash).getBoundingClientRect().top;

                let start = null;

                const step = time => {
                    if (start === null) {
                        start = time;
                    }

                    const progress = time - start,
                        r = (t < 0 ? Math.max(w - progress / 0.5, w + t) : Math.min(w + progress / 0.5, w + t));
                    window.scrollTo(0, r);
                    if (r !== w + t) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                };

                requestAnimationFrame(step);

            };

        btnMenu.addEventListener('click', actionMenu);

        closeBtn.addEventListener('click', actionMenu);

        menuItems.forEach(item => {
            item.addEventListener('click', event => {
                const link = item.querySelector('a');
                actionMenu();
                scrollPage(event, link);
            });
        });

        mainBtn.addEventListener('click', event => {
            scrollPage(event, mainBtn);
        });
    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(item => item.addEventListener('click', () => popup.style.display = 'block'));
        popupClose.addEventListener('click', () => popup.style.display = '');
    };

    togglePopUp();
});
