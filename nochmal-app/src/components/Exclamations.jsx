
const Exclamations = ({wishPick, handleChange}) => {

    let colorMap = new Map();
    if(wishPick.type === 'color'){
        wishPick.valueList.forEach((v) =>{
            if(v === 'b') colorMap.set('b', 'Blue');
            else if(v === 'g') colorMap.set('g', 'Green');
            else if(v === 'o') colorMap.set('o', 'Orange');
            else if(v === 'p') colorMap.set('p', 'Pink');
            else if(v === 'y') colorMap.set('y', 'Yellow');
        })
    }
    
    return(
        <>
            <select name="specials" id="special-id" onChange={handleChange}>
                <option value={wishPick.leftCount +" IX"} className="text-wishpick color-item-w" selected>{wishPick.leftCount +" IX"}</option>
                {
                    wishPick.valueList.map((e) => (
                        <option value={e} className={"text-wishpick color-item-"+ e}>{(wishPick.type === 'color') ? colorMap.get(e) : e}</option>
                    ))
                }
            </select>
        </>
    )
}

export default Exclamations;