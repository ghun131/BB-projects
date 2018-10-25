(function () {
    let operation = '';
    const viewer = document.getElementById('screen');
    let log = document.getElementById('log');
    let record = [];

    const calc = document.getElementById('calculator')
    calc.addEventListener('click', function (e) {
        if (e.target.matches('[data-value]')) {
            const value = e.target.dataset.value;
            viewer.innerText = value;
            console.log('clicked!');
            let regEx = new RegExp("\d+[.]\d");

            if (value === '=') {
                let result = eval(operation);
                result = result.toFixed(4);
                record.push(operation + " = " + result);
                log.innerHTML = record.map(op => `<li>${op}</li>`).join('');
                console.log(record);
                viewer.innerHTML = result;
                operation = '';
            } else if (value === 'C') {
                operation = '';
                viewer.innerHTML = 0;
            } else {
                operation += value
            }
        }
    })
})()

// Event delegation
// DOM Manipulation
// CSS Selector