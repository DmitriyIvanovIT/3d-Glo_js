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
});
