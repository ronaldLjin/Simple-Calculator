const num = document.querySelectorAll('[data-number]');
const operation = document.querySelectorAll('[data-operator]');
const backspace = document.getElementById('delete');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const decimal = document.getElementById('decimal')
let mainNum = document.getElementById('mainNum');
let subNum = document.getElementById('subNum');

let subValue = '';
subNum.textContent = subValue;
let displayValue = 0;
mainNum.textContent = displayValue;

equals.disabled = true;
window.addEventListener('keydown', keyboardSupport)

add = (num1, num2) => {
    return num1 + num2;
}

subtract = (num1, num2) => {
    return num1 - num2;
}

multiply = (num1, num2) => {
    return num1 * num2;
}

divide = (num1, num2) => {
    return num1 / num2;
}

operate = (operator, a, b) => {
    if (operator === ' + ') {
        return add(a, b);
    } else if (operator === ' − ') {
        return subtract(a, b);
    } else if (operator === ' × ') {
        return multiply(a, b);
    } else if (operator === ' ÷ ') {
        return divide(a, b);
    }
}

for (let i = 0; i < num.length - 1; i++) {
    num[i].addEventListener('click', () => {
        appendNumber(i + 1);
    });
}

num[9].addEventListener('click', () => {
    appendNumber(0);
});

appendNumber = (item) => {
    if (displayValue.toString() === '0') {
        displayValue = item.toString();
        mainNum.textContent = displayValue;
    } else if (typeof displayValue == 'number') {
        displayValue = item.toString();
        mainNum.textContent = displayValue;
    } else if (displayValue.toString().length < 9 && displayValue < 100000000) {
        displayValue += "" + item;
        mainNum.textContent = displayValue;
    } else if (displayValue >= 100000000 && displayValue >0) {
        mainNum.textContent = displayValue.toPrecision(5);
    } else if (displayValue <= -100000000 && displayValue<0) {
        mainNum.textContent = displayValue.toPrecision(5);
    } else {
        mainNum.textContent = displayValue.toPrecision(9);
    }
}

let operationArray = [];
for (let i = 0; i < operation.length; i++) {
    operation[i].addEventListener('click', appendOperation = () => {
        num1 = displayValue;
        operator = operation[i].textContent;
        subValue = displayValue +  operation[i].textContent;
        subNum.textContent = subValue;
        displayValue = Number(displayValue);
        equals.disabled = false;
    });

    operationArray.push(function() {
        num1 = displayValue;
        operator = operation[i].textContent;
        subValue = displayValue + operation[i].textContent;
        subNum.textContent = subValue;
        displayValue = Number(displayValue);
        equals.disabled = false;
    })
};

equals.addEventListener('click', appendEquals = () => {
    subValue += displayValue;
    subNum.textContent = subValue;
    displayValue = operate(operator, Number(num1), Number(displayValue));
    if (displayValue.toString().length <= 9 && displayValue < 100000000) {
        mainNum.textContent = displayValue;
    } else if (displayValue >= 100000000 || displayValue <= -100000000) {
        mainNum.textContent = displayValue.toPrecision(5);
    } else if (displayValue < 1 && displayValue >-1) {
        displayValue = Math.round(displayValue*100000000)/100000000
        mainNum.textContent = displayValue;
    } else {
        mainNum.textContent = displayValue.toPrecision(9);
    }
    equals.disabled = true;
})

clear.addEventListener('click', appendClear = () => {
    subValue = '';
    subNum.textContent = subValue;
    displayValue = 0;
    mainNum.textContent = displayValue;
});

backspace.addEventListener('click', appendBackspace = () => {
    if (displayValue.toString().length <= 9 && displayValue.toString().length > 1) {
        displayValue = displayValue.toString().substring(0, displayValue.toString().length - 1);
        mainNum.textContent = displayValue;
    } else if (displayValue.toString().length = 1) {
        displayValue = 0;
        mainNum.textContent = displayValue; 
    } else {
        displayValue = 0;
        mainNum.textContent = displayValue;
    }
})

decimal.addEventListener('click', appendDecimal = () => {
    if (displayValue.toString().length < 9) {
        displayValue += '.';
    } else {
        displayValue = 0;
    }
    mainNum.textContent = displayValue;
})

function keyboardSupport(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter' && equals.disabled == false) appendEquals()
    if (e.key === 'Backspace') appendBackspace()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        operationArray[convertOperator(e.key)]();
    if (e.key === 'c') appendClear();
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return 0;
    if (keyboardOperator === '*') return 1;
    if (keyboardOperator === '-') return 2;
    if (keyboardOperator === '+') return 3;
}