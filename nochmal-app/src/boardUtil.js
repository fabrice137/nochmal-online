
import {starterTable, starterLetterScore, starterColorScore, userData} from "./DataObject/do.js";

let rowLetters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O".split(",");

export const getRowLetter = (j) => {
  return rowLetters[j];
}

export const isColumnFullyCrossed = (colIndex) => {
  for(let i=0; i<starterTable.length; i++) if(starterTable[i][colIndex].sta === 0) return false;
  return true;
}

  
export const getColumnIndex = (letter) => {
  for(let i=0; i<rowLetters.length; i++) if(rowLetters[i] === letter) return i;
  return -1;
}

export const getLowScore = (letter) => {
  let newScoreArray =  [3,2,2,2,1,1,1,0,1,1,1,2,2,2,3];
  for(let i=0; i<rowLetters.length; i++){
    if(rowLetters[i] === letter) return newScoreArray[i];
  }
}

function isInsideMatrix (i, j){
  return ((i >= 0 && j >= 0)  &&  (i < starterTable.length) && (j < starterTable[0].length));
}

export const isNextToCrossed = (i, j) => {
  if(isInsideMatrix(i-1, j) && starterTable[i-1][j].sta === 1) return true; // up
  if(isInsideMatrix(i+1, j) && starterTable[i+1][j].sta === 1) return true; // down
  if(isInsideMatrix(i, j-1) && starterTable[i][j-1].sta === 1) return true; // left
  if(isInsideMatrix(i, j+1) && starterTable[i][j+1].sta === 1) return true; // right
  return false;
}

// COUNT  COUNT  COUNT  COUNT  COUNT  COUNT  COUNT  COUNT
// COUNT  COUNT  COUNT  COUNT  COUNT  COUNT  COUNT  COUNT

export const countLeftStarScore = () => {
  let total = 0;
  for(let i=0; i<starterTable.length; i++){
    for(let j=0; j<starterTable[i].length; j++){
      if( starterTable[i][j].sta === 0  &&  starterTable[i][j].txt === "*" ) total += 2;
    }
  }
  return total;
}

export const countFinalLetterScore = (letterScore) => {
  let total = 0;
  starterLetterScore.forEach(btn =>{
    if( btn.sta === 1 ){
      total += parseInt(btn.txt)
    }
  })
  return total;
}

export const countFinalColorScore = (colorStats) => {
  let total = 0;
  starterColorScore.forEach(cs =>{
    if( cs.count === 0 ){
      total += parseInt(cs.score)
    }
  })
  return total;
}

// MODIFY  MODIFY  MODIFY  MODIFY  MODIFY  MODIFY
// MODIFY  MODIFY  MODIFY  MODIFY  MODIFY  MODIFY

export const boxTick = (bo, i, j) => {
  starterTable[i][j] = bo;
}

export const changeViewableLetterScore = (data) => {

  // console.log("MyId: "+ playerId +" -  HisId: "+ data.playerId +"  -  WasFirst: "+ data.isFirst);

  // let prevLetterScore = [...letterScore];
  let newScore = getLowScore(data.letterTaken);

  starterLetterScore.forEach(btn =>{
    if(btn.ltt === data.letterTaken) btn.txt = newScore
  })
  console.log("FROM SERVER ==> Letter: "+ data.letterTaken +" - newScore: "+ newScore);

}

export const changeViewableColorScore =(data) =>{

  if(data.playerId.length === 0) return;

  if(data.playerId !== userData.playerId){
    if(data.isFirst){

      let color = data.colorTaken;
      // let prevColorCounter = [...colorStats];

      starterColorScore.forEach(cc =>{
        if( cc.name === color ) cc.score = 3;
      })

    }
  }
  
}

  
export const getRandomRoll = () => {

  let array = [];
    rollDiceNumbers().forEach((n) => array.push(n));
    rollDiceColors().forEach((c) => array.push(c));

    let shuffledArray = array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    
    return shuffledArray;
}

function rollDiceNumbers() {
  let randomNumbers = [];

  for (let i = 0; i < 3; i++) {
    let randomNumber = Math.floor(Math.random() * 6); // Generates random number between 0 and 5
    randomNumbers.push({step: 0, taken: false, name: "n", value: randomNumber, id: 'diceroll-box-rn-'+ i});
  }

  return randomNumbers;
}

function rollDiceColors() {
  let randomColors = [];
  let numberForColors = rollDiceNumbers();
  let i = 0;

  numberForColors.forEach(roll =>{
    if (roll.value === 0) randomColors.push({step: 0, taken: false, name: "c", value: "b", id: 'diceroll-box-rc-'+ i}); // blue 
    else if(roll.value === 1) randomColors.push({step: 0, taken: false, name: "c", value: "g", id: 'diceroll-box-rc-'+ i}); // green         
    else if(roll.value === 2) randomColors.push({step: 0, taken: false, name: "c", value: "o", id: 'diceroll-box-rc-'+ i}); // orange 
    else if(roll.value === 3) randomColors.push({step: 0, taken: false, name: "c", value: "p", id: 'diceroll-box-rc-'+ i}); // pink 
    else if(roll.value === 4) randomColors.push({step: 0, taken: false, name: "c", value: "y", id: 'diceroll-box-rc-'+ i}); // yellow 
    else if(roll.value === 5) randomColors.push({step: 0, taken: false, name: "c", value: "n", id: 'diceroll-box-rc-'+ i}); // black
    i++;
  })

  return randomColors;
}

