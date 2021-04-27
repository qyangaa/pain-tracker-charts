import React from "react";

export default function AxisBottom({
  xScale,
  height,
  style,
  tickFormat,
  grid,
}) {
  return xScale.ticks().map((tickValue) => (
    <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      {grid && (
        <line y1={0} y2={height} stroke="black" stroke={style.lineStroke} />
      )}
      <text
        y={style.tickOffset ? height + style.tickOffset : height + 5}
        dy="0.71em"
        style={{ ...style.text, textAnchor: "middle" }}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
}
