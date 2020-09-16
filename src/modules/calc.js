const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');


    const countSum = () => {
        let idAnimateCalc,
            count = 0;

        let total = 0;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        const animateCalc = () => {
            idAnimateCalc = requestAnimationFrame(animateCalc);
            let countValue = 1,
                dayValue = 1;

            if (calcCount.value > 1) {
                console.log(calcCount.value);
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            total = Math.round(price * typeValue * squareValue * countValue * dayValue);

            if (count < total) {
                if ((total - count) >= 10) {
                    count += Math.round(1 - 0.5 + Math.random() * (((total - count) / 10) - 1 + 1));
                } else {
                    count += total - count;
                }

                totalValue.textContent = count;
            } else {
                cancelAnimationFrame(idAnimateCalc);
            }
        };

        if (typeValue && squareValue) {
            animateCalc();

        } else {
            totalValue.textContent = total;
        }
    };

    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });

};

export default calc;