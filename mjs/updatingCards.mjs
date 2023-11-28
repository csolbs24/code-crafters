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
            const cardTemplate = `<div data-card-id="`+i+`" class="card"><img src="`+cards[i].image+`"></img><p>`+cards[i].number+`</p></div>`;
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
export function UpdatePlayerBet(card)
{
    const playerBet = document.getElementById("PlayerBet");
    const cardTemplate = `<div class="card"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
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
export function UpdatePlayerOverflow(amount)
{
    const overflow = document.getElementById("PlayerOverflowCount");
    overflow.innerHTML = amount;
}

// Duplicate versions of the above functions for the enemy.

// Enemy Draw
export function EnemyDraw(amount, handSize)
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
    const cardTemplate = `<div class="card"><img src="`+card.image+`"></img><p>`+card.number+`</p></div>`;
    enemyPlayed.insertAdjacentHTML("beforeend", cardTemplate);
}

// Updating overflow deck
export function UpdateEnemyOverflow(amount)
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