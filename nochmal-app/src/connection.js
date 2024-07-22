
// import React, { useState, useEffect  } from 'react';
import {changeViewableLetterScore, changeViewableColorScore} from './boardUtil.js';

// import {starterTable, starterLetterScore, starterColorStats} from "./DataObject/do.js";
// import {userData, userDataLetter, userDataColor, serverData, serverDataLetter, serverDataColor} from "./DataObject/do.js";
import {userData, userDataLetter, userDataColor, diceData} from "./DataObject/do.js";
import { diceBoxes, setDiceBoxes, setDiceState, setCanIRollNext } from './DataObject/dices.js';

import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
export const socket = io(URL);


let playerId = '';


export const putPlayerId = () =>{
  playerId = socket.id;

  userData.playerId = playerId;
  userDataLetter.playerId = playerId;
  userDataColor.playerId = playerId;
  diceData.playerId = playerId;
}


// const joinRoom = (room) =>{
//   if(room !== ""){
//     socket.emit("join-room", room);
//   }
// }

export const msgServerWithId = (msgTitle, msg) =>{
  userData.msg = msg;
  if(msgTitle === "test-client") socket.emit("test-client", userData);
  else if(msgTitle === "game-start"){
    socket.emit("game-start", userData);
  }
  else if(msgTitle === "score-letterTaken"){
    userDataLetter.letterTaken = msg;
    socket.emit("score-letterTaken", userDataLetter);
  }
  else if(msgTitle === "score-colorTaken"){
    userDataColor.colorTaken = msg;
    socket.emit("score-colorTaken", userDataColor);
  }
  else if(msgTitle === "dice-rolled"){
    diceData.dices = diceBoxes;
    socket.emit("dice-rolled", diceData);
  }
  else if(msgTitle === "dice-picked"){
    diceData.dices = diceBoxes;
    socket.emit("dice-picked", diceData);
  }
  else if(msgTitle === "waiting-for-reroll"){
    socket.emit("waiting-for-reroll", userData);
  }
}



export const msgReciever = (setRoulette) =>{

  socket.on("takenLetter-score", (data) =>{
    // only changes on those that did not yet score the letter 
    changeViewableLetterScore(data);
  })

  socket.on("takenColor-score", (data) =>{
    // only changes on those that did not yet score the color 
    changeViewableColorScore(data);
  })
  
  socket.on("client-tested", (msg) =>{
    userData.msg = msg;
    // printOut(msg)
    // alert(msg); 
  })


  socket.on("roll-dice", (data) =>{
    if(data.playerId !== playerId){
      let receivedDices = [];
      data.dices.forEach(d => {
        d.step = 1;
        receivedDices.push(d);
      });

      setDiceBoxes(receivedDices);
      setRoulette(diceBoxes);
      setDiceState(data.step);
      setCanIRollNext(true);
    }
  })

  socket.on("picked-dice", (data) =>{
    if(data.playerId !== playerId){
      let receivedDices = [];
      data.dices.forEach(d => {
        d.step = 2;
        receivedDices.push(d);
      });

      setDiceBoxes(receivedDices);
      setRoulette(diceBoxes);
      setDiceState(data.step);
    }
  })

  socket.on("re-roll", (data) =>{
    // set all dices to initial state
    let receivedDices = [];
    diceBoxes.forEach(d => {
      d.step = 0;
      d.taken = false;
      receivedDices.push(d);
    });

    setDiceBoxes(receivedDices);
    setRoulette(diceBoxes);
    if(data.playerId !== playerId) setDiceState(data.step);
    else setDiceState("wait");
  })


}

 