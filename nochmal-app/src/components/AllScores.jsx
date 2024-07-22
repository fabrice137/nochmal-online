
import Rectangle from './Rectangle';

const AllScores = ({finalScore}) => {


    return(
        <>
            <div className="total-score">
                <div className="totlabel"><span>Bonus</span></div>
                <div className="totbox"><Rectangle bo={{pos: "finalScore", txt: finalScore.colors}} /></div>
            </div>
        
            <div className="total-score">
                <div className="totlabel"><span>A-O</span></div>
                <div className="totbox"><Rectangle bo={{pos: "finalScore", txt: finalScore.letters}} /></div>
            </div>
        
            <div className="total-score">
                <div className="totlabel"><span>! (+1)</span></div>
                <div className="totbox"><Rectangle bo={{pos: "finalScore", txt: finalScore.optionals}} /></div>
            </div>
        
            <div className="total-score">
                <div className="totlabel"><span>* (-2)</span></div>
                <div className="totbox"><Rectangle bo={{pos: "finalScore", txt: finalScore.stars}} /></div>
            </div>
        
            <div className="total-score">
                <div className="totlabel"><span>Total</span></div>
                <div className="totbox"><Rectangle bo={{pos: "finalScore", txt: finalScore.total}} /></div>
            </div>
        </>
    )
}

export default AllScores;