'use strict';

const reset = document.querySelector('.game__reset');
const cells = document.querySelectorAll('.game__cell');
const gameTitle = document.querySelector('.game__title');
const scores = document.querySelector('.game__scores');
const CROSS_CLASS = 'game__cell--cross';
const ZERO_CLASS = 'game__cell--zero';
const WIN_CLASS = 'game__cell--win';
let isCross = true;

for (let cell of cells) {
  cell.addEventListener('click', onCellClick);
}

reset.addEventListener('click', () => {
  for (let cell of cells) {
    cell.classList.remove(CROSS_CLASS);
    cell.classList.remove(ZERO_CLASS);
    cell.classList.remove(WIN_CLASS);
    
    for (let cell of cells) {
      cell.addEventListener('click', onCellClick);
    }
  }

  if (gameTitle.textContent != 'Крестики-нолики') {
    gameTitle.textContent = 'Крестики-нолики';
  }
});

function onCellClick() {
  if (!this.classList.contains(CROSS_CLASS) && !this.classList.contains(ZERO_CLASS)) {
    isCross ? this.classList.add(CROSS_CLASS) : this.classList.add(ZERO_CLASS);

    isCross = !isCross;

    switch ( checkWinner() ) {
      case 'cross':
        gameTitle.textContent = 'Крестики победили!';
        addResult(1);
        removeOnCellClick();
        break;
      case 'zero':
        gameTitle.textContent = 'Нолики победили!'; 
        addResult(3);
        removeOnCellClick();
        break;
    }
  }
}

function removeOnCellClick() {
  for (let cell of cells) {
    cell.removeEventListener('click', onCellClick);
  }
}

function checkWinner() {
  const combination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

  for (let i = 0; i < combination.length; i++) {
    if (cells[combination[i][0]].classList.contains(CROSS_CLASS) && 
        cells[combination[i][1]].classList.contains(CROSS_CLASS) && 
        cells[combination[i][2]].classList.contains(CROSS_CLASS)) {
      addWinClass(cells[combination[i][0]]);
      addWinClass(cells[combination[i][1]]);
      addWinClass(cells[combination[i][2]]); 

      return 'cross';
    } else if (cells[combination[i][0]].classList.contains(ZERO_CLASS) && 
               cells[combination[i][1]].classList.contains(ZERO_CLASS) && 
               cells[combination[i][2]].classList.contains(ZERO_CLASS)) {
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

function addResult(index) {
  let scoresText = scores.textContent.split(' ');
  scoresText[index] = Number(scoresText[index]) + 1;
  scores.textContent = scoresText.join(' ');
}