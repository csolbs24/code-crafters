// FIREBASE: Creates User and Game if hosted
export function FIREBASECreateDatabase(GameID){
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const GameRef = firebase.database().ref(`${GameID}`);
            GameRef.set({
                HostBetCards: [""],
                HostSubmittedCard: [""],
                HostCardAmount: 5,
                HostDeckAmount: 0,
                PlayerBetCards: [""],
                PlayerSubmittedCard: [""],
                PlayerCardAmount: 5,
                PlayerDeckAmount: 0,
                GameOver: false,
                GameWinner: "",
                RoundWinner:  "",
                RoundOver: false,
            });  
                
            GameRef.onDisconnect().remove();
        }
    });
    
    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
    });
}

// MAKE THIS RETURN ACTUAL VARIABLE
export function FIREBASECheckForGame (GameID){
    let gameExist;
    try {
        const GameRef = firebase.database().ref(`${GameID}`);
        gameExist = true;
    } catch {
        gameExist = false;
    }
    return gameExist;
}

// Starts the game by setting a variable in the firebase
export function FIREBASEStartGame(GameID)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.update({ GameStarted: true });
}

// updates the applicable players bet
export function FIREBASESubmitBetCard(GameID, isHost, card)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        if(isHost){
            const currentBetCards = gameData.HostBetCards;
            currentBetCards.push(card);
            GameRef.update({ HostBetCards: currentBetCards });
        }
        else{
            const currentBetCards = gameData.PlayerBetCards;
            currentBetCards.push(card);
            GameRef.update({ PlayerBetCards: currentBetCards });
        }
    })
}