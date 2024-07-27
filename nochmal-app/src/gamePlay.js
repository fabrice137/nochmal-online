// [Single, Multiple, Official, Test-MainTable, Test-Dice, Test]
let GameMode = "Multiple"; 
export const gameAllow = (value) =>{
    if(GameMode === "Test") return true;
    else if(GameMode === "Test-MainTable") return true;
    else return value;
}

// states: dice-rolled --->> wait -> play(play-dicePick -> play-tableCross) -> re-roll
let gameStatus = "init";

let canIRollNext = true;

export const setGameStatus = (newStatus) =>{
    gameStatus = newStatus;
}

export const getGameStatus = () =>{
    return gameStatus;
}

export const setCanIRollNext = (value) =>{
    canIRollNext = value;
}

export const canRollDice = () =>{
    if(gameStatus === 'init' || (gameStatus === 're-roll' && canIRollNext)){
        return true;
    }
}

