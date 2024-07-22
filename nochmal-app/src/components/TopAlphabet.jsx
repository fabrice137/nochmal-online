
import Rectangle from './Rectangle';

const TopAlphabet = () => {

    let colomnAlphabet = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O";

    return(
        <>
        {
        colomnAlphabet.split(",").map((letter) =>(
            <div className='letter-box'><Rectangle bo={{pos:"topLetter", txt: letter, oth: 0}} /></div>
        ))
        }
        </>
    )
}

export default TopAlphabet;
