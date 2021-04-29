import React from "react";

export default function ColorLegend({
  legends,
  width,
  onClick = () => {},
  clickedSeries,
  style = {
    right: 0.5,
    top: 0,
    tickSpacing: 25,
    tickSize: 7,
    tickTextOffset: 15,
    fadeOpacity: 0.2,
    text: { fontSize: 20, fontFamily: "Indie Flower" },
  },
}) {
  return (
    <>
      {legends.map((legend, idx) => (
        <g
          key={idx}
          transform={`translate(${width * (1 - style.right)}, ${
            -style.top - (idx + 1) * style.tickSpacing
          })`}
          onMouseDown={() => {
            legend.text === clickedSeries
              ? onClick(null)
              : onClick(legend.text);
          }}
          opacity={
            !clickedSeries || legend.text === clickedSeries
              ? 1
              : style.fadeOpacity
          }
        >
          <circle fill={legend.color} r={style.tickSize} />
          <text
            dx={style.tickTextOffset}
            dy="0.32em"
            style={{ ...style.text, cursor: "default" }}
          >
            {legend.text}
          </text>
        </g>
      ))}
    </>
  );
}
