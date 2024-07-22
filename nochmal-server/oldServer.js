const { Socket } = require('socket.io');
const Game = require("./Game.js");

const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});

let gameArray = [];

function findGameIndex(room){
    let foundAt = -1;
    for(let i=0; i<gameArray.length; i++){
        if(gameArray[i].getRoomId() === room) foundAt = i;
    }
    return foundAt;
}


io.on('connection', Socket =>{
    console.log("On-connection: "+ Socket.id);

    Socket.on("game-start", (room, player) =>{
        let index = findGameIndex(room);
        console.log("room id: "+ room + " - player: "+ player)

        if(index < 0){
            let game = new Game(room);
            game.addPlayer(player.id);
            gameArray.push(game);

        }
        else{
            gameArray[index].addPlayer(player.id);
        }
        Socket.join(room);
    })
 


    Socket.on("dice-roll", (dices, room, player) =>{
        console.log("On-diceroll: "+ dices);
        if(room === "") Socket.broadcast.emit("none", "");
        else Socket.to(room).emit("rolled-dices", dices);
    })


    Socket.on("dice-2chosen", (chosenDice, room, player) =>{
        console.log("On-chosendice: "+ chosenDice);
        if(room === "") Socket.broadcast.emit("none", "");
        else Socket.to(room).emit("2chosen-dices", chosenDice);
    })


    Socket.on("score-letterTaken", (letterTaken, room, player) =>{
        console.log("On-lettertaken: "+ letterTaken);

        let index = findGameIndex(room);
        if(index >= 0){
            let isFirst = gameArray[index].canScoreLetterFirst(letterTaken, player.id);

            if(room === "") Socket.broadcast.emit("none", "");
            else Socket.to(room).emit("takenLetter-score", (letterTaken, isFirst));            
        }
    })


    Socket.on("score-colorTaken", (colorTaken, room, player) =>{
        console.log("On-colortaken: "+ colorTaken);

        let index = findGameIndex(room);
        if(index >= 0){
            let isFirst = gameArray[index].canScoreColorFirst(letterTaken, player.id);

            if(room === "") Socket.broadcast.emit("none", "");
            else Socket.to(room).emit("takenColor-score", (colorTaken, isFirst));            
        }
    })


    
    Socket.on("game-end", (finalScores, room, player) =>{
        console.log("On-endgame: "+ endMessage);

        let index = findGameIndex(room);
        if(index >= 0){
            let areAllScoresIn = gameArray[index].addPlayerScore(player.id, finalScores);

            if(areAllScoresIn){
                if(room === "") Socket.broadcast.emit("none", "");
                else Socket.to(room).emit("ending-game", gameArray[index].getFinalScores());  
            }
                 
        }
    })
}) 