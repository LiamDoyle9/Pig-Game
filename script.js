'use strict';

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;

//Selecting elements (both do the same thing in 2 different ways)
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const holdScore = function(){
    //1. Add current score to active player's score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. Check if player's score is >= 100.
    //Finish game.
    if(scores[activePlayer] >= 100){
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }

    //Switch to next player. 
    switchPlayer();
}

const diceRoll = function(){
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    //If dice roll  !== 1
    if (dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
}

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

const resetGame = function(){
    scores[0] = 0;
    scores[1] = 0;
    activePlayer = 0;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    current0El.textContent = 0;
    current1El.textContent = 1;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--winner');
}

//rolling dice functionality
btnRoll.addEventListener('click', diceRoll);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', resetGame);


