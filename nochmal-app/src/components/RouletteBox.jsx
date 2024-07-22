
import Box from './Box';

const RouletteBox = ({diceRoll}) => {

    return(
        <>
        <div className='dice-roller'>
            <Box key="dice-roller-key" bo={{pos: "Roulette-Button", clr:"", txt: "Roll Dice", id:"dice-roller-id", sta: 0}} handleButton={diceRoll} />
        </div>
        </>
    )
}

export default RouletteBox;