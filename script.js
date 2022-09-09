'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const eleScore0 = document.querySelector('#score--0');
const eleScore1 = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const eleDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//note: variables declared inside function cannot be accessed outside, hence we declared them autside then assigned values inside the function.

//Starting conditions
const initialCondtitons = function () {
  scores = [0, 0]; //final scores
  currentScore = 0; //Global, not in event function
  activePlayer = 0; //ie: player 0 starts
  playing = true; //plays until player reaches 100

  eleScore0.textContent = 0;
  eleScore1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  eleDice.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialCondtitons();

const switchPlayer = function() {
  //1. Current score of prev player = 0
  document.getElementById(`current--${activePlayer}`).textContent = 0; 
  //2. Switch player 
  activePlayer = (activePlayer === 0) ? 1 : 0; 
  //3. Reset current score for that player
  currentScore = 0;
  //4.Change active class ie: toggle (if class there it will add it, else remove it)
  player0El.classList.toggle('player--active');    
  player1El.classList.toggle('player--active');
  }

//Rolling dice
btnRoll.addEventListener('click', function() {
  //Works only if playing is true
  if(playing) {
    //1.Generate random dice roll
    //'dice' != 'eleDice' as we get new vlaue everytime 'clicked' not global var
    //'dice' is the value whereas 'eleDice' is the element dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.Display dice
    eleDice.classList.remove('hidden');
    eleDice.src = `dice-${dice}.png`;
    
    //3.Check for rolled 1; if true, switch player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; //selecting score dynamically based on active player
      // current0El.textContent = currentScore; - static based, only when player 0 hence don't use this
    }
    else {
      //Switch player
      switchPlayer();
    }
  }      
});

//Holding Dice
btnHold.addEventListener('click', function() {
  if(playing) {
    //1.Add current score to active player score
    //if player 0 : activeplayer = 0 ; else = 1
    //ie: scores[0] += currentScore or scores[1] += currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(`the value is ${scores[activePlayer]}`);

    //2.Check score is >= 100
    if (scores[activePlayer] >= 100) {
    //Finish the game
    playing = false; //ie:can't play anymore can't press buttons
    eleDice.classList.add('hidden'); 
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
    }
    else {
    //3.Switch Player (also current score will be 0(reset))
    switchPlayer();
    }
  }
});

//Resetting Game
btnNew.addEventListener('click', function() {
 initialCondtitons();
});