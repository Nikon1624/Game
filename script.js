'use strict';

const reset = document.querySelector('.game__reset');
const cells = document.querySelectorAll('.game__cell');
const gameTitle = document.querySelector('.game__title');
const scores = document.querySelector('.game__scores');
let isCross = true;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', () => {
    if (!cells[i].classList.contains('game__cell--unclickable') && isCross) {
      cells[i].classList.add('game__cell--player');
      cells[i].classList.add('game__cell--unclickable');

      isCross = false;

      if ( checkWinner() == 'cross' ) {
        gameTitle.textContent = 'Крестики победили!';

        addResult(1);

        for (let cell of cells) {
          cell.classList.add('game__cell--unclickable');
        }
      }
    } else if (!cells[i].classList.contains('game__cell--unclickable') && !isCross) {
      cells[i].classList.add('game__cell--pc');
      cells[i].classList.add('game__cell--unclickable');

      isCross = true;

      if ( checkWinner() == 'zero' ) {
        gameTitle.textContent = 'Нолики победили!'; 
        
        addResult(3);

        for (let cell of cells) {
          cell.classList.add('game__cell--unclickable');
        }
      }
    }
  });
}

reset.addEventListener('click', () => {
  for (let cell of cells) {
    cell.classList.remove('game__cell--player');
    cell.classList.remove('game__cell--pc');
    cell.classList.remove('game__cell--unclickable');
    cell.classList.remove('game__cell--win');

    if (gameTitle.textContent != 'Крестики-нолики') {
      gameTitle.textContent = 'Крестики-нолики';
    }
  }
});

function checkWinner() {
  const combination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

  for (let i = 0; i < combination.length; i++) {
    if (cells[combination[i][0]].classList.contains('game__cell--player') && cells[combination[i][1]].classList.contains('game__cell--player') && cells[combination[i][2]].classList.contains('game__cell--player')) {
      cells[combination[i][0]].classList.add('game__cell--win');
      cells[combination[i][1]].classList.add('game__cell--win');
      cells[combination[i][2]].classList.add('game__cell--win');

      return 'cross';
    } else if (cells[combination[i][0]].classList.contains('game__cell--pc') && cells[combination[i][1]].classList.contains('game__cell--pc') && cells[combination[i][2]].classList.contains('game__cell--pc')) {
      cells[combination[i][0]].classList.add('game__cell--win');
      cells[combination[i][1]].classList.add('game__cell--win');
      cells[combination[i][2]].classList.add('game__cell--win');

      return 'zero';
    }
  }
}

function addResult(index) {
  let scoresText = scores.textContent.split(' ');
  scoresText[index] = Number(scoresText[index]) + 1;
  scores.textContent = scoresText.join(' ');
}