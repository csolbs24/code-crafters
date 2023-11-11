// FIREBASE: Creates User and Game if hosted
function FIREBASECreateDatabase(GameID){
    
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
async function FIREBASECheckForGame (GameID){
    const GameRef = firebase.database().ref(`${GameID}`);
    console.log(GameID)
    GameRef.once('value')
        .then((snapshot) => {
            const gameData = snapshot.val();
            {
                // CHECK IF GAMEDATA IS NULL
            };
    });
    return true;
}

function FIREBASEStartGame(GameID)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.update({ GameStarted: true });
}

export {FIREBASECreateDatabase, FIREBASECheckForGame, FIREBASEStartGame};