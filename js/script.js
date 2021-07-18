const numbers = document.querySelectorAll('.num')
const clearScreen = document.querySelector('.clear-screen')
const divide = document.querySelector('.divide')
const multiply = document.querySelector('.multiply')
const del = document.querySelector('.backspace')
const minus = document.querySelector('.minus')
const plus = document.querySelector('.plus')
const power = document.querySelector('.power')
const percent = document.querySelector('.percent')
const dot = document.querySelector('.dot')
const equal = document.querySelector('.equal')
const previousOperation = document.querySelector('.previous-operation')
const currentOperation = document.querySelector('.current-operation')
const operations = document.querySelectorAll('.operation')

let scoreNow = '';
let scoreBefore = '';
let action = undefined;

// picking a number //
numbers.forEach(function (num) {
    num.addEventListener('click', function () {
        addNum(num.innerHTML)
        updateScore()
    })
})

let updateScore = function () {
    currentOperation.innerHTML = scoreNow;
    if (action != null) {
        previousOperation.innerHTML = scoreBefore + action;
    } else {
        previousOperation.innerHTML = '';
    }
}

let addNum = function (num) {
    scoreNow = scoreNow.toString() + num.toString()
}

// picking a dot //
dot.addEventListener('click', function () {
    addDot(dot.innerHTML)
    updateScore()
})
let addDot = function (dot) {
    if (scoreNow.includes('.')) {
        return
    }
    scoreNow = scoreNow.toString() + dot.toString()
}

// delete a single number //
del.addEventListener('click', function () {
    backspaceNumber()
    updateScore()
})
let backspaceNumber = function () {
    scoreNow = scoreNow.toString().slice(0, -1)
}

// calculate operatinos
function calculate() {
    let operating
    if (!scoreBefore || !scoreNow) {
        return
    }
    let previous = parseFloat(scoreBefore);
    let current = parseFloat(scoreNow);
    if (isNaN(previous) || isNaN(current)) {
        return
    }
    switch (action) {
        case '+':
            operating = previous + current
            break;
        case '-':
            operating = previous - current
            break;
        case '×':
            operating = previous * current
            break;
        case '÷':
            operating = previous / current
            break;
        case '%':
            operating = previous / 100 * current
            break;
        case '^':
            operating = Math.pow(previous, current)
            break;
        default:
            return
    }
    scoreNow = operating; 
    action = undefined;
    scoreBefore = '';
}
// equal button //
equal.addEventListener('click', function(){
    calculate()
    updateScore()
})

let chooseOperation = function (operation) {
    if (scoreNow === '') {
        return
    }
    if (scoreBefore !== '') {
        calculate()
    }
    action = operation;
    scoreBefore = scoreNow;
    scoreNow = '';
}

operations.forEach(function (operation) {
    operation.addEventListener('click', function () {
        chooseOperation(operation.innerHTML)
        updateScore()
    })
})

// clear screen //
function clear(){
scoreNow = '';
scoreBefore = '';
action = undefined;   
}
clearScreen.addEventListener('click', function(){
    clear()
    updateScore()
})