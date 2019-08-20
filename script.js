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

for (let cell of cells) {
  cell.addEventListener('click', () => {
    if ( !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(ZERO_CLASS) ) {
      
      isCross ? cell.classList.add(CROSS_CLASS) : cell.classList.add(ZERO_CLASS);

      isCross = !isCross;

      checkWinner();

      if ( checkDraw() ) {
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
  }
});

function checkWinner() {
  for (let i = 0; i < gameFieldWidth; i++) {
    let colArr = [];
  
    for (let j = i; j < cells.length; j += gameFieldWidth) {
      colArr.push(cells[j]);
    }
  
    if ( checkClass(colArr, CROSS_CLASS) ) {
      for (let key in colArr) {
        addWinClass(colArr[key]);
      }
      
      addScore(CROSS_INDEX);
      showWinMessage('Крестики победили!');
  
      break;
    }
  
    if ( checkClass(colArr, ZERO_CLASS) ) {
      for (let key in colArr) {
        addWinClass(colArr[key]);
      }
  
      addScore(ZERO_INDEX);
      showWinMessage('Нолики победили!');
  
      break;
    }
  }

  for (let i = 0; i <= cells.length - gameFieldWidth; i += gameFieldWidth) {

    let rowArr = [];

    for (let j = i; j < i + gameFieldWidth; j++) {
      rowArr.push(cells[j])
    }

    if ( checkClass(rowArr, CROSS_CLASS) ) {
      for (let key in rowArr) {
        addWinClass(rowArr[key]);
      }
    
      addScore(CROSS_INDEX);
      showWinMessage('Крестики победили!');
    
      break;
    }
    
    if ( checkClass(rowArr, ZERO_CLASS) ) {
      for (let key in rowArr) {
        addWinClass(rowArr[key]);
      }
    
      addScore(ZERO_INDEX);
      showWinMessage('Нолики победили!');
    
      break;
    }
  }

  let rightDiagonal = [];

  for (let i = gameFieldWidth - 1; i <= cells.length - gameFieldWidth; i += (gameFieldWidth - 1)) {
    rightDiagonal.push(cells[i]);
  }

  if ( checkClass(rightDiagonal, CROSS_CLASS) ) {
    for (let key in rightDiagonal) {
      addWinClass(rightDiagonal[key]);
    }

    addScore(CROSS_INDEX);
    showWinMessage('Крестики победили!');
  }

  if ( checkClass(rightDiagonal, ZERO_CLASS) ) {
    for (let key in rightDiagonal) {
      addWinClass(rightDiagonal[key]);
    }

    addScore(ZERO_INDEX);
    showWinMessage('Нолики победили!');
  }

  let leftDiagonal = [];

  for (let i = 0; i <= cells.length; i += (gameFieldWidth + 1)) {
    leftDiagonal.push(cells[i]);
  }

  if ( checkClass(leftDiagonal, CROSS_CLASS) ) {
    for (let key in leftDiagonal) {
      addWinClass(leftDiagonal[key]);
    }

    addScore(CROSS_INDEX);
    showWinMessage('Крестики победили!');
  }

  if ( checkClass(leftDiagonal, ZERO_CLASS) ) {
    for (let key in leftDiagonal) {
      addWinClass(leftDiagonal[key]);
    }

    addScore(ZERO_INDEX);
    showWinMessage('Нолики победили!');
  }
}

function checkDraw() {
  for (let cell of cells) {
    if (cell.classList.length == 1) {
      return false;
    }
  }

  if ( !winMessageWrapper.classList.contains(MESSAGE_SHOW_CLASS) ) {
    return true;
  }
}

function showWinMessage(message) {
  winMessage.textContent = message;
  winMessageWrapper.classList.add(MESSAGE_SHOW_CLASS);
}

function checkClass(arr, className) {
  return arr.every(item => item.classList.contains(className) ? true : false);
}

function addWinClass(el) {
  el.classList.add(WIN_CLASS);
}

function addScore(index) {
  let scoresText = scores.textContent.split(':');

  scoresText[index] = scoresText[index].split(' ').map(item => !isNaN(item) ? ++item : item).join(' ');

  scores.textContent = scoresText.join(':');
}