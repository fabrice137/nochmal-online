const { Socket } = require('socket.io');
const game = require('./game.js');

const io = require('socket.io')(4000, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});

// let game = new Game();


io.on('connection', Socket =>{
    console.log("On-connection: "+ Socket.id);



    Socket.on("game-start", socketId =>{
        game.addPlayer(socketId);
        // console.log("On--game-start: "+ socketId);
        console.log("Player count: "+ game.getPlayerCount());
        // Socket.broadcast.emit("client-tested", socketId + " Joined the game!");
    })





    Socket.on("test-client", data =>{
        console.log("On--test-client: "+ data.playerId +"  --  "+ data.msg);
        Socket.broadcast.emit("client-tested", data.msg + " - RECEIVED!");
    })

    Socket.on("score-letterTaken", data =>{
        let isFirst = game.canScoreLetterFirst(data.letterTaken, data.playerId);
        console.log("On-lettertaken: [ Letter: "+ data.letterTaken +" , IsFirst: "+ isFirst +", PlayerId: "+ data.playerId +" ]");

        Socket.broadcast.emit("takenLetter-score", {playerId: data.playerId, letterTaken: data.letterTaken, isFirst: isFirst}); 
    })

    Socket.on("score-colorTaken", data =>{
        let isFirst = game.canScoreColorFirst(data.colorTaken, data.playerId);
        console.log("On-colortaken: [ Color: "+ data.colorTaken +" , IsFirst: "+ isFirst +", PlayerId: "+ data.playerId +" ]");

        if(isFirst){
            let howMany = get5ScoreColorById(data.playerId);
            if(howMany === 2){
                gameOver(game.getWinner);
            }
            else {
                Socket.broadcast.emit("takenColor-score", {playerId: data.playerId, colorTaken: data.colorTaken, isFirst: isFirst}); 
            }
        }
        else{
            Socket.broadcast.emit("takenColor-score", {playerId: data.playerId, colorTaken: data.colorTaken, isFirst: isFirst}); 
        }
         
    })

    Socket.on("score-report", data =>{
        game.addPlayerScore(data.playerId, data.totalScore);  
    })




    Socket.on("dice-rolled", data =>{
        game.setCurrentRoller(data.playerId);
        Socket.broadcast.emit("roll-dice", {playerId: data.playerId, dices: data.dices, step: "wait"});  
    })


    Socket.on("dice-picked", data =>{
        Socket.broadcast.emit("picked-dice", {playerId: data.playerId, dices: data.dices, step: "play-dicePick"});  
    })

    Socket.on("waiting-for-reroll", data =>{
        game.addToSet(data.playerId, "cyclePlayerInWaitRerollSet");
        let dones = game.getRollSetCount();

        let allPlayers = 2;
        if(dones === allPlayers){
            let nextPlayer = game.getNextRoller();
            console.log("re-roll ==> PlayerId: "+ data.playerId);
            Socket.broadcast.emit("re-roll", {playerId: nextPlayer, step: "re-roll"});
        }
    })


    function gameOver(winner){
        Socket.broadcast.emit("game-over", {stage: 'over', winner: winner});
    }
}) 