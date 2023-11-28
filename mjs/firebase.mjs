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
                Round: 0,
                GameStarted: false,
                Phase: "bet"
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
export async function FIREBASECheckForGame (GameID){
    try {
        const GameRef = firebase.database().ref();
        const snapshot = await GameRef.child(GameID).get();
        return snapshot.exists();
    } catch {
        console.error("NO GAME BY THAT ID")
        return false
    }
}
 
// Starts the game by setting a variable in the firebase
export function FIREBASEStartGame(GameID)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.update({ GameStarted: true });
}

// Updates the Phase
export function FIREBASESetPhase(GameID, phase)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.update({ Phase: phase });
}

// Updates the Round Number
export function FIREBASEUpdateRound(GameID)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        const round = gameData.Round + 1;
        GameRef.update({ Round: round });
    });

}
 
// updates the applicable players bet
export function FIREBASESubmitBetCard(GameID, isHost, card)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    GameRef.once('value', (snapshot) => {
        const gameData = snapshot.val();
        if(isHost){
            let currentBetCards = gameData.HostBetCards;

            if (currentBetCards[0] === ""){
                currentBetCards = [card];
            }else {
                currentBetCards.push(card);
            }

            GameRef.update({ HostBetCards: currentBetCards });
        }
        else{
            let currentBetCards = gameData.PlayerBetCards;

            if (currentBetCards[0] === ""){
                currentBetCards = [card];
            }else {
                currentBetCards.push(card);
            }
            
            GameRef.update({ PlayerBetCards: currentBetCards });
        }
    })
}

// updates the applicable players bet
export function FIREBASESubmitPlayedCard(GameID, isHost, card)
{
    const GameRef = firebase.database().ref(`${GameID}`);
    if(isHost){
        GameRef.update({ HostSubmittedCard: card });
    }
    else{
        GameRef.update({ PlayerSubmittedCard: card });
    }
}