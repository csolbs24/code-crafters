// FIREBASE: Creates User and Game if hosted
function FIREBASElogin(host, GameID){
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user && host) {
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
                GameStarted: false,
                RoundOver: false,
            });

            if (host)
            {        
                GameRef.onDisconnect().remove();
            }
        }
    });
    
    firebase.auth().signInAnonymously().catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
    });
}

function FIREBASEINIT (GameID){
    const GameRef = firebase.database().ref(`${GameID}`);
    const GameStartedRef = GameRef.child("GameStarted");

    // Runs Every Time the GameData Changes
    GameRef.on('value', (snapshot) => {
        const GameData = snapshot.val();
        console.log("GAME DATA CHANGED")
    })

    // Runs Every Time the GameStarted Changes
    GameStartedRef.on('value', (snapshot) => {
        const GameData = snapshot.val();
        console.log("GAME STARTED");
    })
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

export {FIREBASElogin, FIREBASEINIT, FIREBASECheckForGame, FIREBASEStartGame};