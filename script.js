"use strict";

let gamePattern = [];
let userPattern = [];
const gameColors = ["green", "red", "yellow", "blue"];
let level = 0;
let old = document.querySelector("h2").innerHTML;

document.body.addEventListener("keypress", playGame);
// just at the beggining
function playGame() {
  //reset parameters (arrays, level,etc);
  level = 0;
  userPattern = [];
  gamePattern = [];
  //start sequence
  nextSequence();
  //disable keypress
  document.body.removeEventListener("keypress", playGame);
  //userchoice
  console.log(`testing if ${gamePattern} appears first`);
  for (let color of gameColors) {
    document.querySelector(`.${color}`).addEventListener("click", function () {
      btnActivation(`${color}`);
      //push user choice to userPattern array
      userPattern.push(color);
      console.log(userPattern);
      console.log(gamePattern);
      if (userPattern.length > 0) {
        if (userPattern.length === gamePattern.length) {
          console.log("is checking answer");
          checkAnswer();
        }
      }
    });
  }
}

const btnActivation = function (color) {
  const sound = new Audio(`sounds/${color}.mp3`);
  document.querySelector(`#${color}`).classList.remove("hidden");
  sound.play();
  function Hide() {
    document.querySelector(`#${color}`).classList.add("hidden");
  }
  setTimeout(Hide, 250);
};

function previousPattern() {
  if (gamePattern.length > 0) {
    for (let i of gamePattern) {
      SetTimeout(function () {
        btnActivation(i);
      }, 500);
    }
  } else {
    return;
  }
}

const nextSequence = function () {
  //level up
  level++;
  let levels = document.querySelector("h2");
  levels.innerHTML = `<span class="detach">Level ${level}</span>`;
  //repeat previous array from the game
  //previousPattern();
  //generates a new step bottom activation
  let index = Math.round(Math.random() * 3);
  // get the color from the gameColors array
  let colorPicked = gameColors[index];
  setTimeout(function () {
    btnActivation(colorPicked);
  }, 500);
  //store this new btn activation in the game sequence
  gamePattern.push(colorPicked);
  // make 4 color buttons clickable
};

function checkAnswer() {
  //if (userPattern.length === gameColors.length) {
  for (let i = 0; i < gamePattern.length; i++) {
    if (userPattern[i] === gamePattern[i]) {
      console.log(`Pair ${i} equal`);
    } else {
      console.log(`pair ${i} NOT 🤬`);
      gameOver();
      return false;
    }
  }
}

function gameOver() {
  console.log("wrong");
  document.body.addEventListener("keypress", init);
}
//initiate game pressing any key.

//game over should give u the button to restart game

//start sequence after 1 sec of pressong key

//nextSequence();
