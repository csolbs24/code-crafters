// Authentication
// Host Function - make a new ID - make a firebase database with that ID - Display ID in HTML
// Join Function - Read ID - Questions firebase for that ID - If successful, initiate game for both users
// Initiate Game - Update players in database - signal to update html

// Update card HTML
// Update played cards HTML
// Update HMTL for bluff cards
// HTML for overflow counts

// Timer

// Function to generate a random 4-digit number
function generateRandomNumber() {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

// Function to handle button click
function handleButtonClick() {
    const randomNumber = generateRandomNumber();
    document.getElementById('gameID').textContent = `GAMEID: ${randomNumber}`;
}

// Attach click event listener to the button
document.getElementById('HostButton').addEventListener('click', handleButtonClick);

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