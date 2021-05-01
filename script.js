'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0ElName = document.getElementById('name--0');
const player1ElName = document.getElementById('name--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const maxScore = 100;
let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0ElName.textContent = 'Player 1';
  player1ElName.textContent = 'Player 2';
};

init();

const switchPlayer = () => {
  diceEl.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const diceNumber = Math.trunc(Math.random() * 6 + 1);

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${diceNumber}.png`;

    // Chek for rolled 1
    if (diceNumber !== 1) {
      // Add dice to current score
      currentScore += diceNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to the active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= maxScore
    if (scores[activePlayer] >= maxScore) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Display the player that win the game
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } win!`;

      // Hide the dice
      diceEl.classList.add('hidden');

      // Disable the buttons
      btnRoll.disabled = true;
      btnHold.disabled = true;
    }
    // Switch to the next player
    else switchPlayer();
  }
});

// Start a new game
btnNew.addEventListener('click', init);
