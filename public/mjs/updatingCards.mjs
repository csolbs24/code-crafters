// Define the Card constructor
function card(picture, value) {
    this.picture = picture;
    this.value = value;
}

// Drawing cards
export function PlayerDraw(amount, handSize, cardsTemplateArray)
{
    let extras = 0;
    let cards = []
    let cardCounter = 1

    let DeckAmount = parseInt(document.getElementsByClassName("PlayerOverflowCount").innerHTML)

    // IF THERE IS NOT ENOUGH CARDS IN HAND AND THERE ARE CARDS IN DECK
    if ((amount + handSize) < 5 && DeckAmount > 0){
        // the amount needed to draw from deck is the difference between 5 and the amount needed plus the current handsize
        let drawAmount = 5 - (amount + handSize)
        // if the amount needed is greater than the cards available then pull all the cards
        if (drawAmount > DeckAmount){
            amount = amount + DeckAmount
            document.getElementsByClassName("PlayerOverflowCount").innerHTML = 0;
        }
        // if the amount needed is less then the cards avilable then pull the cards needed
        else {
            amount = amount + drawAmount
            document.getElementsByClassName("PlayerOverflowCount").innerHTML = DeckAmount - drawAmount;
        }
    }

    for (let i=0; i< amount; i++)
    {
        const newCard = cardsTemplateArray[Math.floor(Math.random() * 4) + 0]
        cards.push(newCard);
    }

    for (let i=0; i< cards.length; i++)
    {
        if (cardCounter + handSize <= 5)
        {
            const PlayerHand = document.getElementById("PlayerHand");
            const cardTemplate = `<div data-card-id="`+i+`" class="card playerCard"><img src="`+cards[i].image+`"></img><p>`+cards[i].number+`</p></div>`;
            PlayerHand.insertAdjacentHTML("beforeend", cardTemplate);
            cardCounter += 1;
        }
        else
        {
            extras += 1;
        }
    }
    UpdatePlayerOverflow(extras);
    return cards;
}

// Updating the bet pile
export function UpdatePlayerBet(card)
{
    const playerBet = document.getElementById("PlayerBet");
    const cardTemplate = `<div class="card playerBetCard"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
    playerBet.insertAdjacentHTML("beforeend", cardTemplate);
}

// Updating the cards played
export function UpdatePlayerPlay(card)
{
    const playerPlayed = document.getElementById("PlayField");
    const cardTemplate = `<div class="card"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
    playerPlayed.insertAdjacentHTML("beforeend", cardTemplate);
}

// Updating overflow deck
function UpdatePlayerOverflow(amount)
{
    const overflow = document.getElementById("PlayerOverflowCount");
    overflow.innerHTML = amount;
}

// Duplicate versions of the above functions for the enemy.

// Enemy Draw
export function EnemyDraw(amount, handSize, cardsTemplateArray)
{
    let extras = 0;
    let cards = []
    let cardCounter = 1

    let DeckAmount = parseInt(document.getElementsByClassName("EnemyOverflowCount").innerHTML)

    // IF THERE IS NOT ENOUGH CARDS IN HAND AND THERE ARE CARDS IN DECK
    if ((amount + handSize) < 5 && DeckAmount > 0){
        // the amount needed to draw from deck is the difference between 5 and the amount needed plus the current handsize
        let drawAmount = 5 - (amount + handSize)
        // if the amount needed is greater than the cards available then pull all the cards
        if (drawAmount > DeckAmount){
            amount = amount + DeckAmount
            document.getElementsByClassName("EnemyOverflowCount").innerHTML = 0;
        }
        // if the amount needed is less then the cards avilable then pull the cards needed
        else {
            amount = amount + drawAmount
            document.getElementsByClassName("EnemyOverflowCount").innerHTML = DeckAmount - drawAmount;
        }
    }

    for (let i=0; i< amount; i++)
    {
        const newCard = cardsTemplateArray[Math.floor(Math.random() * 4) + 0]
        cards.push(newCard);
    }

    for (let i=0; i< cards.length; i++)
    {
        if (cardCounter + handSize <= 5)
        {
            const EnemyHand = document.getElementById("EnemyHand");
            const cardTemplate = `<div class="card enemyCard"><p></p></div>`;
            EnemyHand.insertAdjacentHTML("beforeend", cardTemplate);
            cardCounter += 1;
        }
        else
        {
            extras += 1;
        }
    }
    UpdateEnemyOverflow(extras);
}

// Updating the bet pile
export function UpdateEnemyBet(card)
{
    const enemyBet = document.getElementById("EnemyBet");
    const cardTemplate = `<div class="card"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
    enemyBet.insertAdjacentHTML("beforeend", cardTemplate);
}

// Updating the cards played
export function UpdateEnemyPlay(card)
{
    const enemyPlayed = document.getElementById("PlayField");
    const cardTemplate = `<div id="EnemyPlayedCard" class="card"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
    enemyPlayed.insertAdjacentHTML("beforeend", cardTemplate);
}

// Setting Revealed Enemy Played Card
export function RevealEnemyPlay(card)
{
    const enemyCard = document.getElementById("EnemyPlayedCard");
    const cardTemplate = `<div class="card"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
    enemyCard.innerHTML = cardTemplate;
}

// Updating overflow deck
function UpdateEnemyOverflow(amount)
{
    const overflow = document.getElementById("EnemyOverflowCount"); // ID needs to be made still
    overflow.innerHTML = amount;
}

// Update the Enemy hand
export function UpdateEnemyHand()
{
    const EnemyHand = document.getElementById("EnemyHand")
    EnemyHand.children[EnemyHand.children.length-1].remove()
}

// Reseting the Board
export function ResetBoard(){
    document.getElementById("EnemyBet").innerHTML = "";
    document.getElementById("PlayField").innerHTML = "";
    document.getElementById("PlayerBet").innerHTML = "";
}