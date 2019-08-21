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
const winCombinations = [
  '111000000', '000111000', '000000111', '100100100', '010010010', '001001001', '100010001', '001010100'
];
let crossPosition = '000000000';
let zeroPosition = '000000000';
let isCross = true;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', () => {
    if (!cells[i].classList.contains(ZERO_CLASS) && !cells[i].classList.contains(CROSS_CLASS)) {
      if (isCross) {
        cells[i].classList.add(CROSS_CLASS);
        crossPosition = replaceAt(crossPosition, i);
      } else {
        cells[i].classList.add(ZERO_CLASS);
        zeroPosition = replaceAt(zeroPosition, i);
      }

      isCross = !isCross;

      let crossResult = checkWinner(crossPosition);
      let zeroResult = checkWinner(zeroPosition);

      if (crossResult) {
        printWinCells(crossResult);
        showWinMessage('Крестики победили!');
        addScore(CROSS_INDEX);
      } else if (zeroResult) {
        printWinCells(zeroResult);
        showWinMessage('Нолики победили!');
        addScore(ZERO_INDEX);
      }

      if (checkDraw()) {
        showWinMessage('Ничья!');
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
    crossPosition = '000000000';
    zeroPosition = '000000000';
  }
});

function replaceAt(str, index) {
  return `${str.slice(0, index)}1${str.slice(index + 1)}`;
}

function checkWinner(position) {
  let isWin = winCombinations.find(item => (parseInt(item, 2) & parseInt(position, 2)) == parseInt(item, 2));

  if (isWin) return isWin;

  return false;
}

function printWinCells(winPositions) {
  for (let i = 0; i < cells.length; i++) {
    if (winPositions[i] == 1) {
      cells[i].classList.add(WIN_CLASS);
    }
  }
}

function checkDraw() {
  for (let cell of cells) {
    if (cell.classList.length == 1) {
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

function addScore(index) {
  let scoresText = scores.textContent.split(':');

  scoresText[index] = scoresText[index].split(' ').map(item => !isNaN(item) ? ++item : item).join(' ');

  scores.textContent = scoresText.join(':');
}