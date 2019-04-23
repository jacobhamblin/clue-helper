import React from 'react';

const valToColor = [
  'inherit',
  '#ff785f',
  '#ff2a45',
  '#a143be',
];

function Cell({index, playerID, updateValue, value}) {
  return (
    <td
      onClick={() => {updateValue(playerID, index)}}
      style={{backgroundColor: valToColor[value]}}
    />
  )
}

export default Cell;
