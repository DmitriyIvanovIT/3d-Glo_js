window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    const hello = document.querySelector('.hello'),
        todayWeek = document.querySelector('.today__week'),
        currentTime = document.querySelector('.current__time'),
        timer = document.querySelector('.timer');

    const dateTime = () => {
        const newYear = new Date(2021, 0, 1).getTime(),
            toDay = new Date(),
            hour = toDay.getHours(),
            dayWeek = toDay.getDay(),
            time = toDay.toLocaleTimeString('en'),
            leftNewYear = Math.floor((newYear - toDay.getTime()) / 1000 / 60 / 60 / 24);

        const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

        const timesOfDay = item => {
                if (item === 0 || item < 7) {
                    return 'Доброй ночи';
                } else if (item > 6 && item < 12) {
                    return 'Доброе утро';
                } else if (item > 11 && item < 18) {
                    return 'Добрый день';
                } else {
                    return 'Добрый вечер';
                }
            },
            changheStringDay = item => {
                if (item % 10 === 1) {
                    return item + ' день';
                } else if (item % 10 > 1 && item % 10 < 5) {
                    return item + ' дня';
                } else {
                    return item + ' день';
                }
            };

        hello.textContent = timesOfDay(hour);
        currentTime.textContent = time;
        todayWeek.textContent = dayWeek > 0 ? week[dayWeek - 1] : week[0];
        timer.textContent = `До нового года осталось ${changheStringDay(leftNewYear)}`;
    };

    setInterval(dateTime, 1000);
});

