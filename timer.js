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
