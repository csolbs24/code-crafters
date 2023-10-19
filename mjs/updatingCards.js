
// Drawing cards
function PlayerDraw(amount, handSize)
{
    let extras = 0;
    let cards = []

    for (i=0; i<= amount; i++)
    {
        let card = new card(null, Math.floor(Math.random() * 6) + 1);
        card.picture = "https://picsum.photos/200"; // This should hopefully generate a new picture for each card drawn.
        cards.push(card);
    }

    for (i=0; i<= cards.length; i++)
    {
        if (handSize <= 5)
        {
            const PlayerHand = document.getElementById("PlayerHand");
            const cardTemplate = `<div class="card"><p>`+cards[i].value+`</p></div>`;
            PlayerHand.insertAdjacentHTML("beforeend", cardTemplate);
        }
        else
        {
            extras += 1;
        }
    }
    UpdatePlayerOverflow(extras);
}
// Updating the bet pile
function UpdatePlayerBet(card)
{
    const playerBet = document.getElementById("PlayerBet");
    const cardTemplate = `<div class="card"><p>`+card.value+`</p></div>`;
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

    for (i=0; i<= amount; i++)
    {
        let card = new card(null, Math.floor(Math.random() * 6) + 1);
        // card.picture should be the back face picture
        cards.push(card);
    }

    for (i=0; i<= cards.length; i++)
    {
        if (handSize <= 5)
        {
            const EnemyHand = document.getElementById("EnemyHand");
            const cardTemplate = `<div class="card"><p>`+cards[i].value+`</p></div>`;
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