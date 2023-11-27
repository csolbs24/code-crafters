// Define the Card constructor
function card(picture, value) {
    this.picture = picture;
    this.value = value;
}

// Drawing cards
function PlayerDraw(amount, handSize, cardsTemplateArray)
{
    let extras = 0;
    let cards = []

    for (let i=0; i< amount; i++)
    {
        const newCard = cardsTemplateArray[Math.floor(Math.random() * 4) + 1]
        cards.push(newCard);
    }

    for (let i=0; i< cards.length; i++)
    {
        if (handSize <= 5)
        {
            const PlayerHand = document.getElementById("PlayerHand");
            const cardTemplate = `<div onClick="submitCard('`+i+`')" class="card"><img src="`+cards[i].image+`"></img><p>`+cards[i].number+`</p></div>`;
            PlayerHand.insertAdjacentHTML("beforeend", cardTemplate);
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
function UpdatePlayerBet(card)
{
    const playerBet = document.getElementById("PlayerBet");
    const cardTemplate = `<div class="card"><img src="`+cards[i].image+`"></img><p>`+card.number+`</p></div>`;
    playerBet.insertAdjacentHTML("beforeend", cardTemplate);
}

// Updating the cards played
function UpdatePlayerPlay(card)
{
    const playerPlayed = document.getElementById("PlayField");
    const cardTemplate = `<div class="card"><p>`+card.value+`</p></div>`;
    playerPlayed.insertAdjacentHTML = cardTemplate;
}

// Updating overflow deck
function UpdatePlayerOverflow(amount)
{
    const overflow = document.getElementById("PlayerOverflowCount");
    overflow.innerHTML = amount;
}

// Duplicate versions of the above functions for the enemy.

// Enemy Draw
function EnemyDraw(amount, handSize)
{
    let extras = 0;
    let cards = []

    for (let i=0; i< amount; i++)
    {
        let newCard = new card(null, Math.floor(Math.random() * 6) + 1);
        // card.picture should be the back face picture
        cards.push(newCard);
    }

    for (let i=0; i< cards.length; i++)
    {
        if (handSize <= 5)
        {
            const EnemyHand = document.getElementById("EnemyHand");
            const cardTemplate = `<div class="card"><p>Some Image Here</p></div>`;
            EnemyHand.insertAdjacentHTML("beforeend", cardTemplate);
        }
        else
        {
            extras += 1;
        }
    }
    UpdateEnemyOverflow(extras);
}

// Updating the bet pile
function UpdateEnemyBet(card)
{
    const enemyBet = document.getElementById("EnemyBet");
    const cardTemplate = `<div class="card"><p>`+card.value+`</p></div>`;
    enemyBet.insertAdjacentHTML("beforeend", cardTemplate);
}

// Updating the cards played
function UpdateEnemyPlay(card)
{
    const enemyPlayed = document.getElementById("PlayField");
    const cardTemplate = `<div class="card"><p>`+card.value+`</p></div>`;
    enemyPlayed.insertAdjacentHTML = cardTemplate;
}

// Updating overflow deck
function UpdateEnemyOverflow(amount)
{
    const overflow = document.getElementById("EnemyOverflowCount"); // ID needs to be made still
    overflow.innerHTML = amount;
}

export {UpdateEnemyOverflow, UpdatePlayerOverflow, UpdateEnemyPlay, UpdateEnemyBet, EnemyDraw, UpdatePlayerPlay, UpdatePlayerBet, PlayerDraw}