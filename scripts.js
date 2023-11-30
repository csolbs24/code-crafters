// Authentication
// Host Function - make a new ID - make a firebase database with that ID - Display ID in HTML
// Join Function - Read ID - Questions firebase for that ID - If successful, initiate game for both users
// Initiate Game - Update players in database - signal to update html

// Update card HTML
// Update played cards HTML
// Update HMTL for bluff cards
// HTML for overflow counts

import { default as generateRandomNumber } from "./mjs/generateRandomNumber.mjs";

import {FIREBASECreateDatabase, FIREBASECheckForGame, FIREBASEStartGame, FIREBASESubmitBetCard, FIREBASESetPhase, FIREBASESubmitPlayedCard, FIREBASEUpdateRound, FIREBASEUpdateRoundWinner} from "./mjs/firebase.mjs";

import {UpdateEnemyOverflow, UpdatePlayerOverflow, UpdateEnemyPlay, UpdateEnemyBet, EnemyDraw, UpdatePlayerPlay, UpdatePlayerBet, PlayerDraw, ResetBoard, UpdateEnemyHand} from "./mjs/updatingCards.mjs";

let GameID;
let host = false;
let userPlayableCards = [];

const cardsTemplate = [
  {number:1, image:'./images/Ace.png'},
  {number:2, image:'./images/shoes.png'},
  {number:3, image:'./images/Trio.png'},
  {number:4, image:'./images/QuadBike.png'},
  {number:5, image:'./images/Five.png'}]

// Attach click event listener to the button
document.getElementById('HostButton').addEventListener('click', handleHostClick);
document.getElementById('JoinButton').addEventListener('click', handleJoinClick)

// Function to handle button click
async function handleHostClick() {
  GameID = generateRandomNumber();
  document.getElementById('gameID').textContent = `GAMEID: ${GameID}`;

  await FIREBASECreateDatabase(GameID)
  FIREBASEINIT(GameID)

  host = true;
}

async function handleJoinClick() {
  GameID = document.getElementById("gameGameID").value
  const gameExist = await FIREBASECheckForGame(GameID);
  if (gameExist)
  {
    FIREBASEINIT(GameID);
    // Update GameID display value
    document.getElementById('gameID').textContent = `GAMEID: ${GameID}`;
    FIREBASEStartGame(GameID);
  }
}

// THIS IS FOR ALL PLAYERS BEGINING
function PopulateGameBoard(){
  // draw 5 times each
  userPlayableCards = PlayerDraw(5,0, cardsTemplate);
  EnemyDraw(5,0);
  // Set Timer
  Timer();
}

function submitCard(cardNum, clickedCard)
{
  const GameRef = firebase.database().ref(`${GameID}`);
  GameRef.once('value', (snapshot) => {
    const GameData = snapshot.val();
    if (GameData.Phase === "bet") {
      let card = userPlayableCards[parseInt(cardNum)]

      UpdatePlayerBet(card)

      FIREBASESubmitBetCard(GameID, host, card)

      clickedCard.remove();
    }

    else if (GameData.Phase === "play") {
      let card = userPlayableCards[parseInt(cardNum)]

      UpdatePlayerPlay(card)

      FIREBASESubmitPlayedCard(GameID, host, card)

      clickedCard.remove();
    }
  })
}

function Timer()
{
    // Timer
  var timeLeft = 10;
  var elem = document.getElementById('timer');

  var timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      elem.innerHTML = timeLeft;

      if(host)
      {
        FIREBASESetPhase(GameID, "play")
      }

    } else {
      elem.innerHTML = timeLeft;
      timeLeft--;
    }
  }
}

function checkForGameWinner(){
  // THIS IS WHERE YOU CHECK FOR A PLAYER WITH NO MORE CARDS
  return false;
}

function UpdateRoundWinner(winnerName){
  if (winnerName != "")
  {
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.once('value', (snapshot) => {
      const gameData = snapshot.val();
  
      let amountToDraw = 0;
  
      // If the host won
      if (winnerName === "host")
      {
        amountToDraw = gameData.HostBetCards.length * 2;
        if (host){
          PlayerDraw(amountToDraw, userPlayableCards.length,cardsTemplate);
        }
        else {
          // FIX THIS !!
          EnemyDraw(amountToDraw, 5,cardsTemplate);
        }
      }
      // if the player won
      else if (winnerName != "host")
      {
        amountToDraw = gameData.PlayerBetCards.length * 2
        if (host){
          EnemyDraw(amountToDraw, 5,cardsTemplate);
        }
        else{
          // FIX THIS !!
          PlayerDraw(amountToDraw, userPlayableCards.length,cardsTemplate);
        }
      }
    });
  }
}

function checkForRoundWinner(){
  // ONLY THE HOST HAS TO DO THIS
  const GameRef = firebase.database().ref(`${GameID}`);

  GameRef.once('value', (snapshot) => {
    const gameData = snapshot.val();
    console.log(gameData.HostSubmittedCard)
    if (gameData.HostSubmittedCard[0] != "" && gameData.PlayerSubmittedCard[0] != "")
    {
      // THIS IS WHERE YOU DO THE MATH TO SEE WHO WON (I DONT REMEMBER HOW THIS IS DECIDED)
      var hostCard = gameData.HostSubmittedCard
      var playerCard = gameData.PlayerSubmittedCard
      

      if (hostCard.number == 1 && playerCard.number == 5)
      {
        FIREBASEUpdateRoundWinner(GameID, "host");
      }
      else if (playerCard.number == 1 && hostCard.number == 5)
      {
        FIREBASEUpdateRoundWinner(GameID, "player");
      }
      else if (hostCard.number > playerCard.number)
      {
        FIREBASEUpdateRoundWinner(GameID, "host");
      }
      else if (playerCard.number > hostCard.number)
      {
        FIREBASEUpdateRoundWinner(GameID, "player");
      }

      // END ROUND
      console.log("ROUND OVER!")
      const gameOver = checkForGameWinner()
      if (!gameOver){
        FIREBASEUpdateRound(GameID)
        FIREBASESetPhase(GameID, "bet")
      }
    }
})
}

function FIREBASEINIT (GameID){
  const GameRef = firebase.database().ref(`${GameID}`);
  const GameStartedRef = GameRef.child("GameStarted");

  const HostBetCardsRef = GameRef.child("HostBetCards");
  const PlayerBetCardsRef = GameRef.child("PlayerBetCards");

  const HostSubmittedCardRef = GameRef.child("HostSubmittedCard");
  const PlayerSubmittedCardRef = GameRef.child("PlayerSubmittedCard");

  const RoundRef = GameRef.child("Round");
  const RoundWinnerRef = GameRef.child("RoundWinner")

  // Runs Every Time the GameStarted Changes
  GameStartedRef.on('value', (snapshot) => {
      const gameStarted = snapshot.val();
      if (gameStarted)
      {
        PopulateGameBoard();
      }
  })

  // Runs Every Time the HostBetCards Changes
  HostBetCardsRef.on('value', (snapshot) => {
    const hostBetCards = snapshot.val();
    // THIS IS WHERE YOU SHOW BET CARDS PHASE UP OR DOWN -- pass in a variable to UpdateEnemyBet whether it is the first turn or not
    // updateEnemyBet will then update only the backs of the cards
    if(!host && hostBetCards[0] != "")
    {
      UpdateEnemyBet(hostBetCards[hostBetCards.length-1])
      UpdateEnemyHand()
    }
  });

  // Runs Every Time the PlayerBetCards Changes
  PlayerBetCardsRef.on('value', (snapshot) => {
    const playerBetCards = snapshot.val();
    // THIS IS WHERE YOU SHOW BET CARDS PHASE UP OR DOWN -- pass in a variable to UpdateEnemyBet whether it is the first turn or not
    // updateEnemyBet will then update only the backs of the cards
    if(host && playerBetCards[0] != "")
    {
      UpdateEnemyBet(playerBetCards.length-1)
      UpdateEnemyHand()
    }
  });

  // Runs Every Time the HostSubmittedCard Changes
  HostSubmittedCardRef.on('value', (snapshot) => {
    const hostSubmittedCards = snapshot.val();
    if(!host && hostSubmittedCards[0] != "")
    {
      UpdateEnemyPlay(hostSubmittedCards)
    }
    if(host && hostSubmittedCards[0] != "")
    {
      checkForRoundWinner()
    }
  });

  // Runs Every Time the PlayerSubmittedCard Changes
  PlayerSubmittedCardRef.on('value', (snapshot) => {
    const playerSubmittedCards = snapshot.val();
    if(host && playerSubmittedCards[0] != "")
    {
      UpdateEnemyPlay(playerSubmittedCards)
    }
    if(host && playerSubmittedCards[0] != "")
    {
      checkForRoundWinner()
    }
  });

  // Runs Every Time the Round Number Changes - Triggers the Reset of the Board and the Timer to Begin Again
  RoundRef.on('value', (snapshot) => {
    const Round = snapshot.val();
    if (Round > 0){
      ResetBoard()
      Timer()
    }

  });

  RoundWinnerRef.on('value', (snapshot) => {
    const RoundWinner = snapshot.val();
    UpdateRoundWinner(RoundWinner)
  });
}

addEventListener("load", (event) => {
  const PlayerHand = document.getElementById("PlayerHand");

  PlayerHand.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');

    if (clickedCard) {
      const cardId = clickedCard.dataset.cardId;
      submitCard(cardId, clickedCard)
      console.log(`Card with ID ${cardId} was clicked`);
    }
  });

});