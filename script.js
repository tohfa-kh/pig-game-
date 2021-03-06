'use strict';

// Variables
const elScore0 = document.querySelector('#score--0'); //document.getElementById('score--0')
const elScore1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//starting values
elScore0.textContent = 0;
elScore1.textContent = 0;
dice.classList.add('hidden');

//Rolling the dice
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  elScore0.textContent = 0;
  elScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  currentScore = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      //currentScore0.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold button job
//let totalScore = 0;
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

/// New game button
btnNew.addEventListener('click', init);
