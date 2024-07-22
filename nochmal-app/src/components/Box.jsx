import React from 'react';

import starBlue from '../starFolder/star-blue.svg';
import starGreen from '../starFolder/star-green.svg';
import starOrange from '../starFolder/star-orange.svg';
import starPink from '../starFolder/star-pink.svg';
import starYellow from '../starFolder/star-yellow.svg';


const Box = ({ bo, handleButton }) => {
    let starIcon;
    if(bo.clr === "b") starIcon = starBlue;
    else if(bo.clr === "g") starIcon = starGreen;
    else if(bo.clr === "o") starIcon = starOrange;
    else if(bo.clr === "p") starIcon = starPink;
    else if(bo.clr === "y") starIcon = starYellow;
    
    let textView = bo.txt;
    

    function handleButtonClick(){
        if(bo.pos === "mt") { // position: "main table"
            handleButton(bo)
        }
        else if(bo.pos === "Roulette-Button"){ // position: "column score"         
            handleButton(bo)
        }
        else if(bo.pos === "roll-box"){
            if(bo.sta === 0) handleButton(bo);
        }
    }

    return (
        <button id={bo.id} onClick={handleButtonClick}>
            {(bo.txt === "*") ? (<img src={starIcon} alt={textView}/>) : (textView)}
        </button>
    );
};

export default Box;
