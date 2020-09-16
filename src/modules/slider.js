const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content'),
        portfolioDots = document.querySelector('.portfolio-dots');

    let dot;

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        },
        nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

    const createDots = () => {
        for (let i = 0; i < slide.length; i++) {
            portfolioDots.insertAdjacentHTML('beforeend', `
                    <li class="dot"></li>
               `);
        }
        dot = document.querySelectorAll('.dot');

        nextSlide(dot, currentSlide, 'dot-active');
    };

    createDots();

    const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        },
        startSlide = (time = 1500) => {
            interval = setInterval(autoPlaySlide, time);
        },
        stopSlide = () => {
            clearInterval(interval);
        };

    slider.addEventListener('click', event => {
        event.preventDefault();

        const target = event.target;
        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((item, i) => {
                if (item === target) {
                    currentSlide = i;
                }
            });
        }

        if (currentSlide >= slide.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
        if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', event => {
        if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
            startSlide();
        }
    });

    startSlide(1500);
};

export default slider;