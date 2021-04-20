"use strict";

/// Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

/// Starting Conditions
// let currentScore = 0;
// let activePlayer = 0;
// let score = [0, 0];
// let playing = true;
///////OR //////
let currentScore, activePlayer, score, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();

function switchPlayer() {
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
}
/// Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    ///1. Generate a Random Dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    ///2.Display a dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    ///3. Checked for rolled 1: if true, switch player
    if (dice !== 1) {
      /// add to current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      ///switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    ////Add current score to the active player
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      ///If player's score is >=100, Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      ////Switch to next player
      switchPlayer();
    }
  }
});
/// Resetting the game
btnNew.addEventListener("click", init);
