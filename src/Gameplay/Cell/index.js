import React from 'react';
import './Cell.css';

const valToColor = ['inherit', '#ff785f', '#ff2a45', '#a143be'];

function Cell({ memoryPos, playerID, updateValue, value }) {
  return (
    <td
      className="color"
      onClick={() => {
        updateValue(playerID, memoryPos);
      }}
      style={{ backgroundColor: valToColor[value] }}
    />
  );
}

export default Cell;
