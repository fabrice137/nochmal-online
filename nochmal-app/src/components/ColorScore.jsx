
import Rectangle from './Rectangle';

const ColorScore = ({colorStats}) => {

    return(
        <>
          {
            colorStats.map((c) =>(
                <div className="color-score">
                    <Rectangle bo={{pos:"colorScore", clr: c.name.charAt(0), txt: c.score,  sta: c.count}} />
                </div>
            ))
            }
        </>
    )
}

export default ColorScore;