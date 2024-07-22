// {step: 0, taken: false, name: "c", value: "g", id: "diceroll-box-rn-1"},  {step: 0, taken: false, name: "n", value: 3, id: "diceroll-box-rc-2"}
export let diceBoxes = [];
export let diceState = "init"; // states: dice-rolled --->> wait -> play(play-dicePick -> play-tableCross) -> re-roll
let numberPicked = -1;
let colorPicked = "white";
let canIRollNext = true;

export const getCanIRollNext = () =>{
    return canIRollNext;
}

export const setCanIRollNext = (value) =>{
    canIRollNext = value;
}

export const setDiceBoxes = (newDices) =>{
    diceBoxes = [...newDices];
    resetPickedValues();
}

export const isButtonAllowedByDice = (bo) =>{
    // if(bo.clr !== colorPicked) return false;
    // if(numberPicked === 0) return false;
    if(diceState !== "play-tableCross") return false;
    return (bo.clr !== colorPicked || numberPicked === 0) ? false : true;
}

export const decreasePickCount = () =>{
    numberPicked--;
}

export const getPickCountLeft = () =>{
    return numberPicked;
}

export const howManyTaken = () =>{
    let count = 0;
    diceBoxes.forEach((db) =>{
        if(db.taken) count++;
    });
    return count;
}


export const setDiceState = (newState) =>{
    diceState = newState;
}

export const setPickedValue = (bo) =>{
    diceBoxes.forEach((db) =>{
        if(bo.id === db.id){
            if(bo.id.includes("-rn-") && numberPicked === -1){
                numberPicked = parseInt(bo.txt);
                db.taken = true;
            }
            else if(bo.id.includes("-rc-") && colorPicked === "white"){
                colorPicked = bo.clr;
                db.taken = true;
            }
        }
    })

    let pickedCount = 0

    if(numberPicked !== -1) pickedCount++;
    if(colorPicked !== "white") pickedCount++;

    if(pickedCount === 2){
        diceBoxes.forEach((d) =>{
            d.step = 2;
        })
    }

    return pickedCount;
}

function resetPickedValues(){
    numberPicked = -1;
    colorPicked = "white";
}

export const setSpecialValue = (whichType, valuePicked) =>{
    if(whichType === "color") colorPicked = valuePicked;
    else if(whichType === "number") numberPicked = valuePicked;
}


export const setWishPickList = (whichType) =>{
    let newValueList = [];
    let diceRolledValues = getRolledValues(whichType);

    if(whichType === 'number'){
      for(let i=1; i<=5; i++){
        if( !diceRolledValues.includes(i) ) newValueList.push(i);
      }
    }
    else if(whichType === 'color'){
        let colorList = ['b', 'g', 'o', 'p', 'y'];
      for(let i=0; i<colorList.length; i++){
        if( !diceRolledValues.includes(colorList[i]) ) newValueList.push(colorList[i]);
      }
    }
  
    return newValueList;
  }

  function getRolledValues(whichType){
    let list = [];

    if(whichType === 'number'){
        diceBoxes.forEach((db) =>{
            if(db.id.includes("-rn-") && !db.taken){
                list.push(db.value);
            }
        })
    }
    else if(whichType === 'color'){
        diceBoxes.forEach((db) =>{
            if(db.id.includes("-rc-") && !db.taken){
                list.push(db.value);
            }
        })
    }
    return list;
  }