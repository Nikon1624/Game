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
const CROSS_INDEX = 0;
const ZERO_INDEX = 1;
let isCross = true;

for (let cell of cells) {
  cell.addEventListener('click', () => {
    if ( !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(ZERO_CLASS) ) {
      
      isCross ? cell.classList.add(CROSS_CLASS) : cell.classList.add(ZERO_CLASS);

      isCross = !isCross;

      switch ( checkWinner() ) {
        case 'cross':
          winMessage.textContent = 'Крестики победили!';
          winMessageWrapper.classList.add(MESSAGE_SHOW_CLASS);
          addScore(CROSS_INDEX);
          break;
        case 'zero':
          winMessage.textContent = 'Нолики победили!';
          winMessageWrapper.classList.add(MESSAGE_SHOW_CLASS);
          addScore(ZERO_INDEX);
          break;
      }

      if ( checkDraw() ) {
        winMessage.textContent = 'Ничья';
        winMessageWrapper.classList.add(MESSAGE_SHOW_CLASS);
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
  }
});

function checkDraw() {
  for (let cell of cells) {
    if (cell.classList.length == 1) {
      return false;
    }
  }

  if ( !checkWinner() ) {
    return true;
  }
}

function checkWinner() {
  const combination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

  for (let i = 0; i < combination.length; i++) {
    if ( cells[combination[i][0]].classList.contains(CROSS_CLASS) &&
      cells[combination[i][1]].classList.contains(CROSS_CLASS) &&
      cells[combination[i][2]].classList.contains(CROSS_CLASS) ) {
      addWinClass(cells[combination[i][0]]);
      addWinClass(cells[combination[i][1]]);
      addWinClass(cells[combination[i][2]]);

      return 'cross';
    } else if ( cells[combination[i][0]].classList.contains(ZERO_CLASS) &&
      cells[combination[i][1]].classList.contains(ZERO_CLASS) &&
      cells[combination[i][2]].classList.contains(ZERO_CLASS) ) {
      addWinClass(cells[combination[i][0]]);
      addWinClass(cells[combination[i][1]]);
      addWinClass(cells[combination[i][2]]);

      return 'zero';
    }
  }
}

function addWinClass(el) {
  el.classList.add(WIN_CLASS);
}

function addScore(index) {
  let scoresText = scores.textContent.split(':');

  scoresText[index] = scoresText[index].split(' ').map(item => !isNaN(item) ? ++item : item).join(' ');

  scores.textContent = scoresText.join(':');
}