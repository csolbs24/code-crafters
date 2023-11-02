// Authentication
// Host Function - make a new ID - make a firebase database with that ID - Display ID in HTML
// Join Function - Read ID - Questions firebase for that ID - If successful, initiate game for both users
// Initiate Game - Update players in database - signal to update html

// Update card HTML
// Update played cards HTML
// Update HMTL for bluff cards
// HTML for overflow counts

import { default as generateRandomNumber } from "./modules/generateRandomNumber.mjs";
import { FIREBASElogin, FIREBASEINIT, FIREBASECheckForGame, FIREBASEStartGame} from './modules/firebase.mjs';

// Attach click event listener to the Host button
document.getElementById('HostButton').addEventListener('click', handleHostButtonClick);

// Attach click event listener to the Join button
document.getElementById('JoinButton').addEventListener('click', handleJoinButtonClick);

// Function to handle button click
function handleHostButtonClick() {
  const randomNumber = generateRandomNumber();
  document.getElementById('gameID').textContent = `GAMEID: ${randomNumber}`;
  FIREBASElogin(true, randomNumber);

  // Change this to a be in a INIT-FUNCTION
  FIREBASEINIT(randomNumber);
}

async function handleJoinButtonClick() {
  const GameID = document.getElementById("gameGameID").value;
  const GameFound =  FIREBASECheckForGame(GameID);
  if (GameFound)
  {
    FIREBASEINIT(GameID);
    FIREBASEStartGame(GameID);
  }
}

// Timer
var timeLeft = 30;
var elem = document.getElementById('timer');

var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    clearTimeout(timerId);
    elem.innerHTML = timeLeft;
    //call a function to submit cards
    //in the case that the cards are submitted before we reach zero just set time left to zero.
  } else {
    elem.innerHTML = timeLeft;
    timeLeft--;
  }
}