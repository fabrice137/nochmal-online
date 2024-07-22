
import Box from './Box';

const DiceBoxes = ({randomDiceRoll, handleButton}) => {

    let rdr = randomDiceRoll;
    let bd = ' box-dice ';
    let divClass = 'button-color-';
    let pos = "roll-box";

    return(
        <>
        <div className={"step-"+ rdr[0].step}>
            <div className={((rdr[0].name === "c") ? bd + divClass + rdr[0].value : bd + '') + (rdr[0].taken ? ' dice-taken ' : '')}>
                <Box bo={{pos: pos, clr: (rdr[0].name === "c") ? rdr[0].value : '-', txt: (rdr[0].name === "n") ? rdr[0].value : '', id: rdr[0].id, sta: rdr[0].taken ? 1 : 0}} handleButton={handleButton} />
            </div>
            <div className={((rdr[1].name === "c") ? bd + divClass + rdr[1].value : bd + '') + (rdr[1].taken ? ' dice-taken ' : '')}>
                <Box bo={{pos: pos, clr: (rdr[1].name === "c") ? rdr[1].value : '-', txt: (rdr[1].name === "n") ? rdr[1].value : '', id: rdr[1].id, sta: rdr[1].taken ? 1 : 0}} handleButton={handleButton} />
            </div>
            <div className={((rdr[2].name === "c") ? bd + divClass + rdr[2].value : bd + '') + (rdr[2].taken ? ' dice-taken ' : '')}>
                <Box bo={{pos: pos, clr: (rdr[2].name === "c") ? rdr[2].value : '-', txt: (rdr[2].name === "n") ? rdr[2].value : '', id: rdr[2].id, sta: rdr[2].taken ? 1 : 0}} handleButton={handleButton} />
            </div>
        </div>
        
        <div className={"step-"+ rdr[0].step}>
            <div className={((rdr[3].name === "c") ? bd + divClass + rdr[3].value : bd + '') + (rdr[3].taken ? ' dice-taken ' : '')}>
                <Box bo={{pos: pos, clr: (rdr[3].name === "c") ? rdr[3].value : '-', txt: (rdr[3].name === "n") ? rdr[3].value : '', id: rdr[3].id, sta: rdr[3].taken ? 1 : 0}} handleButton={handleButton} />
            </div>
            <div className={((rdr[4].name === "c") ? bd + divClass + rdr[4].value : bd + '') + (rdr[4].taken ? ' dice-taken ' : '')}>
                <Box bo={{pos: pos, clr: (rdr[4].name === "c") ? rdr[4].value : '-', txt: (rdr[4].name === "n") ? rdr[4].value : '', id: rdr[4].id, sta: rdr[4].taken ? 1 : 0}} handleButton={handleButton} />
            </div>
            <div className={((rdr[5].name === "c") ? bd + divClass + rdr[5].value : bd + '') + (rdr[5].taken ? ' dice-taken ' : '')}>
                <Box bo={{pos: pos, clr: (rdr[5].name === "c") ? rdr[5].value : '-', txt: (rdr[5].name === "n") ? rdr[5].value : '', id: rdr[5].id, sta: rdr[5].taken ? 1 : 0}} handleButton={handleButton} />
            </div>
        </div>
        </>
    )
}

export default DiceBoxes;