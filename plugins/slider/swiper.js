// eslint-disable-next-line strict
'use strict';

class SliderCarousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        slidesToShow = 3,
        position = 0,
        responsive = []
    }) {
        if (!main || !wrap) {
            console.warn('slider-carusel: Необходимо 2 свойства, "main" и "wrap"!');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            whidthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow
        };
        this.responsive = responsive;
    }

    init() {
        this.addSwiperClass();
        this.addStyle();

        if (this.prev && this.next) {
            this.controlSlide();
        } else {
            this.addArrow();
            this.controlSlide();
        }

        if (this.responsive) {
            this.responseInit();
        }
    }

    addSwiperClass() {
        this.main.classList.add('swiper');
        this.wrap.classList.add('swiper__wrap');
        for (const item of this.slides) {
            item.classList.add('swiper__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCarousel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
            document.head.append(style);
        }

        style.textContent = `
                .swiper {
                    overflow: hidden !important;
                }
                .swiper__wrap {
                    display: flex !important;
                    transition: transform 0.5s !important;
                    will-change: transform !important;
                }
                .swiper__item {
                    flex: 0 0 ${this.options.whidthSlide}% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    margin: auto 0 !important;
                }
                .swiper__prev,
                .swiper__next {
                    margin: 0 10px;
                    border: 20px solid transparent;
                    background: transparent;
                    cursor: pointer;
                    outline: none;
                }

                .swiper__prev:hover,
                .swiper__next:hover {
                    background: transparent;
                }

                .swiper__next {
                    border-left-color: #19b5fe;
                }

                .swiper__prev {
                    border-right-color: #19b5fe;
                }
            `;
    }

    controlSlide() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.whidthSlide}%)`;
        }

    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.whidthSlide}%)`;
        }

    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'swiper__prev';
        this.next.className = 'swiper__next';
        this.main.append(this.prev);
        this.main.append(this.next);
    }

    responseInit() {
        const slidestToShowDefault = this.slidesToShow,
            allResponse = this.responsive.map(item => item.breakpoint),
            maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;

            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widthWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.whidthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                }
            } else {
                this.slidesToShow = slidestToShowDefault;
                this.options.whidthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };

        checkResponse();
        window.addEventListener('resize', checkResponse);
    }
}
