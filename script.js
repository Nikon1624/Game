'use strict';
const gameField = document.querySelector('.game__field');
const reset = document.querySelector('.game__reset');
const cells = document.querySelectorAll('.game__cell');
let move = 0;

gameField.addEventListener('click', evt => {
  let target = evt.target;

  if ( target.classList.contains('game__cell') && move % 2 == 0) {
    target.classList.add('game__cell--player');
  }

  if ( target.classList.contains('game__cell') && move % 2 != 0) {
    target.classList.add('game__cell--pc');
  }
  
  move++;
});

reset.addEventListener('click', () => {
  for (let cell of cells) {
    cell.classList.remove('game__cell--player');
    cell.classList.remove('game__cell--pc');
  }
});

function checkWinner() {
  
}