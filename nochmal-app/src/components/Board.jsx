import React from 'react';
import Box from './Box';

const Board = ({rows, handleButton}) =>{
  let className = 'box-board  button-color-';
  return(
      <>
        {
          rows.map((row) =>(
            <div className="row-board-box">
              {
                row.map((e) =>(
                  <div className={className + e.clr + (e.sta === 1 ? ' box-clicked' : '')}><Box key={e.id} bo={e} handleButton={handleButton} /></div>
                ))
              }
            </div>
          ))
        }
        
      </>
  )
}

export default Board;