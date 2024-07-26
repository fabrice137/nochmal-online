
import Box from './Box';

const RouletteBox = ({rollerText, diceRoll}) => { // "Roll Dice"

    return(
        <>
        <div className='dice-roller'>
            <Box key="dice-roller-key" bo={{pos: "Roulette-Button", clr:"", txt: rollerText, id:"dice-roller-id", sta: 0}} handleButton={diceRoll} />
        </div>
        </>
    )
}

export default RouletteBox;