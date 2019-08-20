'use strict';

const reset = document.querySelector('.game__reset');
const cells = document.querySelectorAll('.game__cell');
const gameTitle = document.querySelector('.game__title');
const scores = document.querySelector('.game__scores');
const winMessageWrapper = document.querySelector('.game__win-message-wrapper');
const winMessage = document.querySelector('.game__win-message');
const CROSS_CLASS = 'game__cell--cross';
const ZERO_CLASS = 'game__cell--zero';
const WIN_CLASS = 'game__cell--win';
const MESSAGE_SHOW_CLASS = 'game__win-message-wrapper--show';
const gameFieldWidth = Math.sqrt(cells.length);
const CROSS_INDEX = 0;
const ZERO_INDEX = 1;
let isCross = true;
const winCombs = [
    "111000000", "000111000", "000000111",
    "100100100", "010010010", "001001001",
    "100010001", "001010100",
];
let crossBits = "000000000";
let zeroBits = "000000000";

function replaceAt(str, index) {
    return str.substr(0, index) + "1" + str.substr(index + 1);
}

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', () => {
        if (!cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(ZERO_CLASS)) {

            if (isCross) {
                cell.classList.add(CROSS_CLASS);
                crossBits = replaceAt(crossBits, i);
            } else {
                cell.classList.add(ZERO_CLASS);
                zeroBits = replaceAt(zeroBits, i);
            }

            isCross = !isCross;

            if (checkWinner(crossBits)) {
                addScore(CROSS_INDEX);
                showWinMessage('Крестики победили!');
            } else if (checkWinner(zeroBits)) {
                addScore(CROSS_INDEX);
                showWinMessage('Нолики победили!');
            }

            if (checkDraw()) {
                showWinMessage('Ничья');
            }
        }
    });
}

reset.addEventListener('click', () => {
    for (let cell of cells) {
        cell.classList.remove(CROSS_CLASS);
        cell.classList.remove(ZERO_CLASS);
        cell.classList.remove(WIN_CLASS);
        winMessageWrapper.classList.remove(MESSAGE_SHOW_CLASS);
        crossBits = "000000000";
        zeroBits = "000000000";
    }
});

function checkWinner(bits) {
    return winCombs.some(elem => (parseInt(bits, 2) & parseInt(elem, 2)) === parseInt(elem, 2));
}

function checkDraw() {
    for (let cell of cells) {
        if (cell.classList.length === 1) {
            return false;
        }
    }

    if (!winMessageWrapper.classList.contains(MESSAGE_SHOW_CLASS)) {
        return true;
    }
}

function showWinMessage(message) {
    winMessage.textContent = message;
    winMessageWrapper.classList.add(MESSAGE_SHOW_CLASS);
}

function checkClass(arr, className) {
    return arr.every(item => item.classList.contains(className));
}

function addWinClass(el) {
    el.classList.add(WIN_CLASS);
}

function addScore(index) {
    let scoresText = scores.textContent.split(':');

    scoresText[index] = scoresText[index].split(' ').map(item => !isNaN(item) ? ++item : item).join(' ');

    scores.textContent = scoresText.join(':');
}
