// {step: 0, taken: false, name: "c", value: "g", id: "diceroll-box-rn-1"},  {step: 0, taken: false, name: "n", value: 3, id: "diceroll-box-rc-2"}
export let diceBoxes = [];
let numberPicked = -1;
let colorPicked = "white";
let alreadyPickedIds = []

export const setDiceBoxes = (newDices) =>{
    diceBoxes = [...newDices];
    resetPickedValues();
}

export const isButtonAllowedByDice = (bo) =>{
    return (bo.clr !== colorPicked || numberPicked === 0) ? false : true;
}

export const decreasePickCount = () =>{
    numberPicked--;
}

export const getPickCountLeft = () =>{
    return numberPicked;
}

export const whatStepOfDices = () =>{
    return diceBoxes[0].step;
}


export const setPickedValue = (bo) =>{
    diceBoxes.forEach((db) =>{
        if(bo.id === db.id && !alreadyPickedIds.includes(db.id)){
            if(bo.id.includes("-rn-") && numberPicked === -1){
                numberPicked = parseInt(bo.txt);
                db.taken = true;
            }
            else if(bo.id.includes("-rc-") && colorPicked === "white"){
                colorPicked = bo.clr;
                db.taken = true;
            }
        }
    });
}

export const hasDicesBeenPicked = () =>{
    let pickedCount = 0

    if(numberPicked !== -1) pickedCount++;
    if(colorPicked !== "white") pickedCount++;

    return pickedCount === 2;
}

function resetPickedValues(){
    numberPicked = -1;
    colorPicked = "white";
    alreadyPickedIds = [];
    diceBoxes.forEach((db) =>{
        if(db.taken === true){
            alreadyPickedIds.push(db.id);
        }
    })
}

export const setSpecialValue = (whichType, valuePicked) =>{
    if(whichType === "color") colorPicked = valuePicked;
    else if(whichType === "number") numberPicked = parseInt(valuePicked);
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