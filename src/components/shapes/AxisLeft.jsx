import React from "react";

export default function AxisLeft({
  yScale,
  style,
  yScaleAccessor,
  grid,
  width,
  height,
}) {
  return yScale[yScaleAccessor]().map((tickValue) => (
    <g
      key={tickValue}
      transform={`translate(0, ${
        yScale.bandwidth
          ? yScale(tickValue) + yScale.bandwidth() / 2
          : yScale(tickValue)
      })`}
    >
      {grid && (
        <line x1={0} x2={width} stroke="black" stroke={style.lineStroke} />
      )}
      <text
        x={style.tickOffset ? -style.tickOffset : -5}
        style={{ ...style.text, textAnchor: "end" }}
      >
        {tickValue}
      </text>
    </g>
  ));
}
