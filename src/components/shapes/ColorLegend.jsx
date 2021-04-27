import React from "react";

export default function ColorLegend({
  cScale,
  width,
  label,
  height,
  onHover = () => {},
  hoveredValue,
  style = {
    top: 30,
    tickSpacing: 25,
    tickSize: 7,
    tickTextOffset: 15,
    fadeOpacity: 0.2,
  },
}) {
  return (
    <>
      <text
        dx={width + 30}
        dy={style.top}
        style={{ ...style.label, cursor: "default" }}
      >
        {label}
      </text>
      {cScale.domain().map((domainValue, idx) => (
        <g
          key={idx}
          transform={`translate(${width + 30}, ${
            style.top + (idx + 1) * style.tickSpacing
          })`}
          onMouseEnter={() => onHover(domainValue)}
          onMouseOut={() => onHover(null)}
          opacity={
            !hoveredValue || domainValue === hoveredValue
              ? 1
              : style.fadeOpacity
          }
        >
          <circle fill={cScale(domainValue)} r={style.tickSize} />
          <text
            dx={style.tickTextOffset}
            dy="0.32em"
            style={{ ...style.text, cursor: "default" }}
          >
            {domainValue}
          </text>
        </g>
      ))}
    </>
  );
}
