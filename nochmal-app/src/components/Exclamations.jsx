
const Exclamations = ({wishPick}) => {

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

    // let forShow = {leftCount: 8, type: 'number', valueList: [1, 2, 3, 4, 5]};   className={wishPick.canShow ? '' : 'hide-special'}
    
    return(
        <>
            <select name="specials" id="special-id">
                <option value={wishPick.leftCount +" IX"} className="text-wishpick color-item-w">{wishPick.leftCount +" IX"}</option>
                {
                    wishPick.valueList.map((e) => (
                        <option value={e} className={"text-wishpick color-item-"+ e}>{colorMap.get(e)}</option>
                    ))
                }
            </select>
            {/* <div className={wishPick.canShow ? 'hide-special' : ''}><span>{wishPick.leftCount +" IX."}</span></div> */}
            {/* <select name="specials" id="special-id" className={wishPick.canShow ? 'hide-special' : ''}>
                <option value={wishPick.leftCount +" IX"} className="text-wishpick color-item-w">{wishPick.leftCount +" IX"}</option>
                {
                    forShow.valueList.map((e) => (
                        <option value={e} className={"text-wishpick color-item-"+ e}>{colorMap.get(e)}</option>
                    ))
                }
            </select> */}
        </>
    )
}

export default Exclamations;