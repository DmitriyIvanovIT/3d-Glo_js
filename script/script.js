window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    const body = document.querySelector('body');

    // Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        // eslint-disable-next-line prefer-const
        let idInterval;

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
        idInterval = setInterval(updateClock, 1000);
    };

    countTimer('02 september 2020');


    // Меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        const actionMenu = () => {
                menu.classList.toggle('active-menu');
            },
            scrollPage = (e, elem) => {
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

        body.addEventListener('click', event => {
            let target = event.target;
            if (target.closest('menu>ul>li') ||
                target.classList.contains('close-btn') ||
                target.closest('.menu') ||
                (!target.closest('menu') && menu.classList.contains('active-menu'))) {
                actionMenu();
            }

            if (target.closest('menu>ul>li') || target.closest('main>a')) {
                target = target.closest('main>a') ? target.closest('main>a') : target;
                scrollPage(event, target);
            }
        });
    };

    toggleMenu();

    // popup
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
    togglePopUp();
    window.addEventListener('resize', togglePopUp);

    // табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab ');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tabContent[i].classList.remove('d-none');
                    tab[i].classList.add('active');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;

            if (target.closest('.service-header-tab')) {
                target = target.closest('.service-header-tab');
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});
