
import Rectangle from './Rectangle';

const ScoreRows = ({scoreArray}) => {

    return(
        <>
            {
            scoreArray.map((score) =>(
                <div className='column-score'><Rectangle bo={score} /></div>
            ))
            }
        </>
    )
}

export default ScoreRows;