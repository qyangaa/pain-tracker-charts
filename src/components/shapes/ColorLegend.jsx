import React from "react";

export default function ColorLegend({
  legends,
  width,
  onClick = () => {},
  clickedSeries,
  style = {
    right: 10,
    top: 10,
    tickSpacing: 50,
    tickSize: 20,
    tickTextOffset: 15,
    fadeOpacity: 0.2,
    text: { fontSize: 30, fontFamily: "Indie Flower", fill: "white" },
  },
}) {
  return (
    <>
      {legends.map((legend, idx) => (
        <g
          key={idx}
          transform={`translate(${
            width - idx * style.tickSpacing - style.right
          }, ${-style.top})`}
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
          {(!clickedSeries || legend.text === clickedSeries) && (
            <text
              dx={0}
              dy="0.32em"
              textAnchor="middle"
              style={{ ...style.text, cursor: "default" }}
            >
              ✓
            </text>
          )}
        </g>
      ))}
    </>
  );
}
