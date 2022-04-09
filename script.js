"use strict";

let gamePattern = [];
let userPattern = [];
const gameColors = ["green", "red", "yellow", "blue"];
let level = 0;
const sound = new Audio(`sounds/green.mp3`);
const wrong = new Audio("sounds/wrong.mp3");

//PLAYGAME
function playGame() {
  document.querySelector("#overlay").style.display = "none";
  level = 0;
  gamePattern = [];
  nextSequence();
}
//NEXT SEQUENCE
const nextSequence = function () {
  document.querySelector(
    "h2"
  ).innerHTML = `<h2 class="detach">LEVEL ${level}</span></h2>`;
  userPattern = [];
  let index = Math.round(Math.random() * 3);
  let randomChosenColour = gameColors[index];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  for (let button of gameColors) {
    document.querySelector(`.${button}`).addEventListener("click", userChoice);
  }
};
function animatePress(buttoncolor) {
  let button = document.querySelector(`#${buttoncolor}`);
  button.classList.remove("hidden");
  sound.play();
  setTimeout(() => button.classList.add("hidden"), 200);
}

function userChoice(e) {
  let colorClicked = e.target.classList[1];
  animatePress(colorClicked);
  userPattern.push(colorClicked);
  checkAnswer(userPattern.length - 1);
}

//CHECK
function checkAnswer(currentlevel) {
  if (userPattern[currentlevel] === gamePattern[currentlevel]) {
    if (userPattern.length === gamePattern.length) {
      level++;
      setTimeout(() => {
        previousPattern();
      }, 500);
    }
  } else {
    return gameOver();
  }
}
//GAMEOVER
function gameOver() {
  wrong.play();
  //add eventlistener to restart the game
  document.body.addEventListener("keypress", playGame);
  //display an overlay GAME OVER SETUP.
  document.querySelector("#overlay").style.display = "block";
}
//START
document.body.addEventListener("keypress", playGame);

function previousPattern() {
  for (let button of gameColors) {
    document
      .querySelector(`.${button}`)
      .removeEventListener("click", userChoice);
  }
  //loop over the gamePatter in order to show the iteration 0.5 second gap.
  for (let i = 1; i <= gamePattern.length; i++) {
    setTimeout(() => {
      animatePress(gamePattern[i - 1]);
    }, 1000 * i);
    console.log(gamePattern.length, gamePattern);
    if (i === gamePattern.length) {
      return setTimeout(nextSequence, 1000 * (i + 1));
    }
  }
}
