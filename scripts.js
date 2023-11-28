// Authentication
// Host Function - make a new ID - make a firebase database with that ID - Display ID in HTML
// Join Function - Read ID - Questions firebase for that ID - If successful, initiate game for both users
// Initiate Game - Update players in database - signal to update html

// Update card HTML
// Update played cards HTML
// Update HMTL for bluff cards
// HTML for overflow counts

import { default as generateRandomNumber } from "./mjs/generateRandomNumber.mjs";

import {FIREBASECreateDatabase, FIREBASECheckForGame, FIREBASEStartGame, FIREBASESubmitBetCard} from "./mjs/firebase.mjs";

import {UpdateEnemyOverflow, UpdatePlayerOverflow, UpdateEnemyPlay, UpdateEnemyBet, EnemyDraw, UpdatePlayerPlay, UpdatePlayerBet, PlayerDraw} from "./mjs/updatingCards.mjs";

let GameID;
let host = false;

const cardsTemplate = [{number:1, image:'./images/Ace.png'},{number:2, image:'./images/shoes.png'},
{number:3, image:'./images/Trio.png'},{number:4, image:'./images/QuadBike.png'},{number:5, image:'./images/Five.png'}]

// Attach click event listener to the button
document.getElementById('HostButton').addEventListener('click', handleHostClick);

document.getElementById('JoinButton').addEventListener('click', handleJoinClick)

// Function to handle button click
function handleHostClick() {
  GameID = generateRandomNumber();
  document.getElementById('gameID').textContent = `GAMEID: ${GameID}`;

  FIREBASECreateDatabase(GameID)
  FIREBASEINIT(GameID)
  host = true;
}

function handleJoinClick() {
  GameID = document.getElementById("gameGameID").value
  const gameExist = FIREBASECheckForGame(GameID);
  console.log(gameExist)

  if (gameExist)
  {
    FIREBASEINIT(GameID);
    FIREBASEStartGame(GameID);
    // Update GameID display value
    document.getElementById('gameID').textContent = `GAMEID: ${GameID}`;
  }
}

// THIS IS FOR ALL PLAYERS BEGINING
function PopulateGameBoard(){
  // draw 5 times each
  PlayerDraw(5,0);
  EnemyDraw(5,0);
  // Set Timer
  Timer();
}

// ONLY FOR HOST PLAYER
function HostGameBoard() {
  
}

function Timer()
{
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
}

function FIREBASEINIT (GameID){
  const GameRef = firebase.database().ref(`${GameID}`);
  const GameStartedRef = GameRef.child("GameStarted");
  const GameHostBetRef = GameRef.child("HostBetCards");
  const GamePlayerBetRef = GameRef.child("PlayerBetCards");

  // Runs Every Time All the GameData Changes
  GameRef.on('value', (snapshot) => {
      const GameData = snapshot.val();
      // CALL CODE HERE
  })

  // Runs Every Time the GameStarted Changes
  GameStartedRef.on('value', (snapshot) => {
      const GameData = snapshot.val();
      // CALL CODE HERE
      PopulateGameBoard();
  })

  GameHostBetRef.on('value', (snapshot) => {
    const HostBetData = snapshot.val();
    if (host)
    {
      // Pupulate the Host Bet Area
    }
  })

  GamePlayerBetRef.on('value', (snapshot) => {
    const PlayerBetData = snapshot.val();
    if (!host)
    {
      // Pupulate the Player Bet Area
    }
  })
}

