import React from "react";
import "./Cell.css";

const valToColor = ["inherit", "#ff785f", "#ff2a45", "#a143be", "#ccc"];

function Cell({ label, playerID, updateValue, value }) {
  return (
    <td
      className="color"
      onClick={() => {
        updateValue(playerID, label);
      }}
      style={{ backgroundColor: valToColor[value] }}
    />
  );
}

export default Cell;
