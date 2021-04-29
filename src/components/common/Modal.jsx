import React from "react";
import { scaleOrdinal, schemeCategory10 } from "d3";

export default function Modal({ selections, onSelect }) {
  const colors = scaleOrdinal(schemeCategory10);
  return (
    <div className="modal">
      {selections.map((selection, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(selection)}
          style={{ backgroundColor: colors(idx) }}
        >
          {selection.name}
        </button>
      ))}
    </div>
  );
}
