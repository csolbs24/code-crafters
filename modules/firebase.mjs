// FIREBASE: Creates User and Game if hosted
function FIREBASElogin(host, GameID){
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const GameRef = firebase.database().ref(`${GameID}`);
            GameRef.set({
                HostCards: [""],
                HostBet: [""],
                HostCardAmount: 5,
                PlayerCards: [""],
                PlayerBet: [""],
                PlayerCardAmount: 5,
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

    // Runs Every Time the Winner Changes
    GameRef.on('value', (snapshot) => {
        const GameData = snapshot.val();
        console.log(GameData);
    })
}

export {FIREBASElogin, FIREBASEINIT};