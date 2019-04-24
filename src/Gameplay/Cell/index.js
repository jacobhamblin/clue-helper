import React from 'react';
import './Cell.css';

const valToColor = ['inherit', '#ff785f', '#ff2a45', '#a143be'];

function Cell({ index, playerID, playerOrder, updateValue, value }) {
  const order = playerOrder > 0 ? playerOrder % 2 == 0 ? 'even' : 'odd' : '';
  return (
    <td
      className='color'
      onClick={() => {
        updateValue(playerID, index);
      }}
      style={{ backgroundColor: valToColor[value] }}
    />
  );
}

export default Cell;
