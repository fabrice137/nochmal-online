import './App.css';

import React, { useState, useEffect  } from 'react';
// COMPONENTS IMPORTS 
import Board from "./components/Board";
import TopAlphabet from "./components/TopAlphabet";
import ScoreRows from './components/ScoreRows';
import Exclamations from './components/Exclamations';
import ColorScore from './components/ColorScore';
import AllScores from './components/AllScores';
import DiceBoxes from './components/DiceBoxes';
import RouletteBox from './components/RouletteBox';

// DATA AND FUNCTIONS IMPORTS 
import { getRowLetter, isColumnFullyCrossed, getColumnIndex, getLowScore,
  isNextToCrossed, boxTick, getRandomRoll } from './boardUtil.js';

import {socket, msgServerWithId, putPlayerId, msgReciever} from "./connection.js";
import {starterTable, starterLetterScore, starterColorScore, 
  starterFinalScore, starterWishScore} from "./DataObject/do.js";

import { diceBoxes, setDiceBoxes, setPickedValue, hasDicesBeenPicked, isButtonAllowedByDice, setSpecialValue,
  decreasePickCount, getPickCountLeft, whatStepOfDices, setWishPickList } from './DataObject/dices.js';

import {gameAllow, gameAllows, setGameStatus, getGameStatus, canRollDice, setCanIRollNext} from './gamePlay.js';


  // https://github.com/WebDevSimplified/Learn-React-In-30-Minutes/blob/master/src/App.js

const App = () => {

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [boxes, setBoxes] = useState(starterTable);
  const [letterScore, setLetterScore] = useState(starterLetterScore);
  const [wishPick, setWishPick] = useState(starterWishScore);
  const [colorStats, setColorStats] = useState(starterColorScore);
  const [playerId, setPlayerId] = useState("");
  const [roulette, setRoulette] = useState(getRandomRoll());
  const [finalScore, setFinalScore] = useState(starterFinalScore);
  const [rollerText, setRollerText] = useState("Roll Dice");
  // const [logConsole, setLogConsole] = useState('Log Console: ');  // JSON.stringify(colorStats)


  socket.on("connect", () => {
    setPlayerId(socket.id);
    putPlayerId();
    // printOut(socket.id);
  })

  useEffect(() => {
    msgReciever(setRoulette);
  }, []);

  // function printOut(log){
  //   let newLog = logConsole;
  //   newLog += "  ----  "+ log;
  //   setLogConsole(newLog);
  // }

  function handleLetterScoreButton(letter){
    let prevLetterScore = [...letterScore];
    // {pos: "cs", clr:"gray", txt: 5, id:"score:A5", sta: 0}
    let isChanged = false;
    let viewableScore = 0;
    
    prevLetterScore.forEach(btn =>{
      if( btn.ltt === letter ){
        
        btn.sta = 1;
        isChanged = true;
        viewableScore = parseInt(btn.txt);
      }
    })


    if(isChanged) {
      setNewFinalScore("letters", viewableScore);
      setLetterScore(prevLetterScore);
      // send something to server
      if(viewableScore !== getLowScore(letter)) msgServerWithId("score-letterTaken", letter);
    }
  }


  const buttonClick = (bo) =>{
    let buttonType = bo.pos;

    if(buttonType === "mt"){
      // main table button is clicked
      let i = -1, j = -1;
      i = parseInt(bo.id.charAt(1));
      j = getColumnIndex(bo.id.charAt(0));

      // check if button clicked is even allowed based on the dice rolled
      let isAllowed = gameAllow( (getGameStatus() !== "play-tableCross") && isButtonAllowedByDice(bo) );

      let canCross = isAllowed ? mainTableButtonCrossCheck(bo, i, j) : false;

      if( canCross ){
        decreasePickCount();

        if(isColumnFullyCrossed(j)) {
          handleLetterScoreButton(getRowLetter(j));
        }

        // if all pick counts are used, set the dice state to wait-reroll
        let leftPicks = getPickCountLeft();
        if(leftPicks === 0) {
          setGameStatus("re-roll");
        }
      }
    }
    else if(buttonType === "Roulette-Button"){
      // let allowedToRollNow = true || getCanIRollNext();

      if( rollerText === "Turn Over" || gameAllow( canRollDice() ) ){

        if(rollerText === "Roll Dice"){
          setDiceBoxes(getRandomRoll())
          setRoulette(diceBoxes);
          setWishPick({leftCount: wishPick.leftCount, type: 'number', valueList: []});
          
          setGameStatus("play-dicePick");
          // setCanIRollNext(false);
          setCanIRollNext(gameAllows("no-server", false)); // if server is working change it to server

          msgServerWithId("dice-rolled", diceBoxes);
        }
        else if(rollerText === "Turn Over"){
          setRollerText("Roll Dice");
          setGameStatus("re-roll");
        }

        
      }
      
    }
    else if(buttonType === "roll-box"){

      if(gameAllow(getGameStatus() === "play-dicePick")){

        // wishPick
        if(bo.clr === 'n'){
          setWishPick({leftCount: wishPick.leftCount -1, type: 'color', valueList: setWishPickList('color')});
        }
        else if(bo.txt === '0' || bo.txt === 0){
          setWishPick({leftCount: wishPick.leftCount -1, type: 'number', valueList: setWishPickList('number')});
        }

        setPickedValue(bo);
        let copyDiceBoxes = [...diceBoxes];
        setRoulette(copyDiceBoxes);

        diceCheckDeal();

      }
      
    }

  }

  function handleChange(){
    let e = document.getElementById("special-id");
    let value = e.options[e.selectedIndex].value;
    let colorList = ['b', 'g', 'o', 'p', 'y'];
    let whichType = 'number';
    if(colorList.includes(value)) whichType = 'color';

    setSpecialValue(whichType, value);
    setNewFinalScore("optionals", 1);

    diceCheckDeal();
  }

  function diceCheckDeal(){
    let copyDiceBoxes = [...diceBoxes];
    setRoulette(copyDiceBoxes);

    if(hasDicesBeenPicked()){
      setGameStatus("play-tableCross");
      setRollerText("Turn Over");
      

      if(whatStepOfDices() === 2) setCanIRollNext(true);
      else msgServerWithId("dice-picked", copyDiceBoxes);
    }
  }

  function mainTableButtonCrossCheck (bo, i, j){
    let canCross = false;

    if(isGameStarted){
      if(isNextToCrossed(i, j)){
        singleButtonChange(bo, i, j);
        canCross = true;
      }
    }
    else{
      if(j === 7){
        setIsGameStarted(true);
        singleButtonChange(bo, i, j);
        // join game in server
        msgServerWithId("game-start", playerId);
        canCross = true;
      }
    }
    return canCross;
  }
  

  function singleButtonChange(bo, i, j){
    if(bo.sta === 1) return; // stop anything from already picked boxes

    handleColorCount(bo);

    if(bo.txt === "*") setNewFinalScore("stars", 2);

    bo.sta = 1;
    boxTick(bo, i, j);
    setBoxes(starterTable);
  }

  function handleColorCount(bo) {

    let newColorCounter = [...colorStats];
    let scoreToBeAdded = 0;
    let colorName = "none";

    newColorCounter.forEach(cs => {
      if(cs.count > 0){

        if(cs.name.charAt(0) === bo.clr){
          cs.count = cs.count - 1;

          if(cs.count === 0){
            if(cs.score === 5){
              colorName = cs.name;
              scoreToBeAdded = 5;
            }
            else{
              scoreToBeAdded = 3;
            }
            
          }
        }
      }
      
    })

    setColorStats(newColorCounter);
    if(scoreToBeAdded > 0) {
      setNewFinalScore("colors", scoreToBeAdded);

      // send something to server
      if(colorName !== "none") msgServerWithId("score-colorTaken", colorName);
    }

  }

  function setNewFinalScore(field, scoreToAdd) {
    // { colors: 0, letters: 0, optionals: 8, stars: -30, total: -22 }

    let fs = { 
      colors: finalScore.colors, 
      letters: finalScore.letters, 
      optionals: finalScore.optionals, 
      stars: finalScore.stars, 
      total: finalScore.total 
    };

    switch (field) {
      case "colors": fs.colors += scoreToAdd;
        break;
      
      case "letters": fs.letters += scoreToAdd;
        break;

      case "optionals": fs.optionals += scoreToAdd;
        break;
      
      case "stars": fs.stars += scoreToAdd;
        break;
    
      default: fs.total += 0;
        break;
    }

    fs.total = (fs.colors + fs.letters + fs.optionals + fs.stars);
    setFinalScore(fs);

    msgServerWithId("score-report", fs.total);
  }

  





  return (
    <div className="App" >
      <div className='first-level body-part'></div>
      <div className="game-body">
        <div className="left-side">
          <div className="color-score-col"><ColorScore colorStats={colorStats}/></div>
        </div>
        <div className="gap-vertical-space"></div>

        <div className="middle-side">
          <div className="letter-score-row"><TopAlphabet/></div>
          <div className="gap-horizontal-space-middle"></div>
          <div className="main-board"><Board rows={boxes} handleButton={buttonClick}/></div>
          <div className="gap-horizontal-space-middle"></div>
          <div className="column-score-row"><ScoreRows scoreArray={letterScore}/></div>
        </div>
        <div className="gap-vertical-space"></div>

        <div className="right-side">
          <div className="wish-pick"><Exclamations wishPick={wishPick} handleChange={handleChange}/></div>
          <div className="gap-horizontal-space-right"></div>
          <div className='right-lower-end'>
            <div className='dice-roulette'>
              <div className="dice-roll"><DiceBoxes randomDiceRoll={roulette} handleButton={buttonClick}/></div>
              <div className='dice-roller'><RouletteBox rollerText={rollerText} diceRoll={buttonClick}/></div>
            </div>
            <div className="final-scores"><AllScores finalScore={finalScore}/></div>
          </div>
        </div>
      </div>
      <div className='third-level body-part'></div>

      {/* <div className='devlogs'>{logConsole}</div> */}

    </div>
  );

}

export default App;
