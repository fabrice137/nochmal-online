
const roomId = "roomId0912883";
let playerSet = new Set();
let scoreByPlayerId = new Map();
let twoColorsByPlayerId = new Map();

let cyclePlayerInWaitRerollSet = new Set();

let tempCycleRollSet = new Set(); // those already rolled in the current cycle
let currentRoller = '';

let winner = {playerId: '', totalScore: 0};

// let letterScore = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];
let letterScoreById = new Map();
['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'].forEach(letter => {
    letterScoreById.set(letter, "noId");
})

// let colorScore = ["blue","green","orange","pink","yellow"];
let colorScoreById = new Map();
["blue","green","orange","pink","yellow"].forEach(color => {
    colorScoreById.set(color, "noId");
})

function get5ScoreColorById(playerId){
    let lastColorCount = twoColorsByPlayerId.get(playerId);
    if(lastColorCount && lastColorCount === 1) return 2;
    else {
        twoColorsByPlayerId.set(playerId, 1);
        return 1;
    }
}

function addToSet(playerId, whichSet) {
    if(whichSet === "cyclePlayerInWaitRerollSet") cyclePlayerInWaitRerollSet.add(playerId);
    else if(whichSet === "tempCycleRollSet") tempCycleRollSet.add(playerId);
}

function getRollSetCount(){
    return cyclePlayerInWaitRerollSet.size;
}

function resetRollSet(whichSet){
    if(whichSet === "cyclePlayerInWaitRerollSet") cyclePlayerInWaitRerollSet = new Set();
    else if(whichSet === "tempCycleRollSet") tempCycleRollSet = new Set();
}

function setCurrentRoller(playerId){
    currentRoller = playerId;
}

function getNextRoller(){
    // cyclePlayerInWaitRerollSet.forEach((p) =>{
    //     if(p !== currentRoller) return p;
    // })
    return currentRoller; // by'agateganyo
}
    
    
function getRoomId(){
    return roomId;
}

function isPlayerInRoom(playerId){
    return playerSet.has(playerId);
}

function addPlayer(playerId){
    playerSet.add(playerId);
    scoreByPlayerId.set(playerId, 0);
}

function getPlayerCount(){
    return playerSet.size;
}

function addPlayerScore(playerId, score){
    scoreByPlayerId.set(playerId, score);

    if(winner.totalScore < score){
        winner.playerId = playerId;
        winner.totalScore = score;
    }

    if(scoreByPlayerId.size === playerSet.size) return true;
    else return false;
}

function canScoreLetterFirst(letter, playerId){
    if(letterScoreById.get(letter) === "noId"){
        letterScoreById.set(letter, playerId);
        return true;
    }
    else return false;
}

function canScoreColorFirst(color, playerId){
    if(colorScoreById.get(color) === "noId"){
        colorScoreById.set(color, playerId);
        return true;
    }
    else return false;
}

function getWinner(){
    return winner;
}

// function getFinalScores(){
//     return Object.entries(scoreByPlayerId).sort((a, b) => a[1] - b[1]); // sort by scores
// }



module.exports = {
    getRoomId,
    isPlayerInRoom,
    addPlayer,
    getPlayerCount,
    addPlayerScore,
    canScoreLetterFirst,
    canScoreColorFirst,
    getWinner,
    get5ScoreColorById,

    addToSet, getRollSetCount, resetRollSet, setCurrentRoller, getNextRoller
};

// exports default Game;