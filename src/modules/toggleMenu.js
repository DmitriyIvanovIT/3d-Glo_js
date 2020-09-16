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

    document.body.addEventListener('click', event => {
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

export default toggleMenu;