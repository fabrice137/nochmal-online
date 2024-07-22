import React from 'react';

const Rectangle = ({bo}) => {
    let textView = bo.txt;
    let className = 'rectangle-box ';


    if(bo.pos === "topLetter"){
        className += 'center-item top-letter ';
        if(bo.txt === 'H') className += 'letter-h-center';
    }
    if(bo.pos === "columnScore"){
        className += 'center-item bottom-score ';

        if(bo.sta === 1){
            className += 'score-done';
        }
    }

    if(bo.pos === "colorScore"){
        className += 'color-score-left color-item-'+ bo.clr;
        if(bo.sta === 1){
            className += ' score-done';
        }
    }

    if(bo.pos === "finalScore"){
        className += 'total-score-grade';
    }

    return (
        <div className={className}  >
            <span>{textView}</span>
        </div>
    );
};

export default Rectangle;
