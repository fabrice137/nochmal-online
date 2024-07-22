

class Game {

    constructor(){
        // this.roomId = roomId;
        this.roomId = "roomId0912883";
        this.playerSet = new Set();
        this.scoreByPlayerId = new Map();

        // let letterScore = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];
        this.letterScoreById = new Map();
        ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'].forEach(letter => {
            letterScoreById.set(letter, "noId");
        })

        // let colorScore = ["blue","green","orange","pink","yellow"];
        this.colorScoreById = new Map();
        ["blue","green","orange","pink","yellow"].forEach(color => {
            colorScoreById.set(color, "noId");
        })

    }
    
    get getRoomId(){
        return this.roomId;
    }

    isPlayerInRoom(playerId){
        return this.playerSet.has(playerId);
    }

    addPlayer(playerId){
        this.playerSet.add(playerId);
        this.scoreByPlayerId.set(playerId, 0);
    }

    getPlayerCount(){
        return this.playerSet.size;
    }

    addPlayerScore(playerId, score){
        this.scoreByPlayerId.set(playerId, score);
        if(this.scoreByPlayerId.size === this.playerSet.size) return true;
        else return false;
    }

    canScoreLetterFirst(letter, playerId){
        if(this.letterScoreById.get(letter) === "noId"){
            this.letterScoreById.set(letter, playerId);
            return true;
        }
        else return false;
    }

    canScoreColorFirst(color, playerId){
        if(this.colorScoreById.get(color) === "noId"){
            this.colorScoreById.set(color, playerId);
            return true;
        }
        else return false;
    }

    getFinalScores(){
        return Object.entries(this.scoreByPlayerId).sort((a, b) => a[1] - b[1]); // sort by scores
    }


}

module.exports = {
    Game
};

// exports default Game;