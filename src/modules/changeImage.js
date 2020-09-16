const changeImage = () => {
    const img = document.querySelectorAll('.command__photo');

    const changeImg = item => {
        const src = item.src;

        item.src = item.dataset.img;
        item.dataset.img = src;
    };

    img.forEach(item => {
        item.addEventListener('mouseover', () => changeImg(item));
        item.addEventListener('mouseout', () => changeImg(item));
    });
};

export default changeImage;