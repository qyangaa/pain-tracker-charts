import React from "react";
import { curveNatural, curveLinear, line } from "d3";
import { ReactRough, Path, Circle } from "react-rough";

export default function LineMarks({
  data,
  xScale,
  yScale,
  xAccessor,
  yAccessor,
  style,
  tooltipStyle,
  tootipFormat,
  displayCircle,
}) {
  return (
    <g>
      <path
        fill="none"
        stroke="black"
        d={line()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d)))
          .curve(curveLinear)(data)}
        style={style.path}
      />
      {displayCircle &&
        data.map((d, idx) => (
          <circle
            cx={xScale(xAccessor(d))}
            cy={yScale(yAccessor(d))}
            r={style.circle.circleRadius}
            style={style.circle}
            key={idx}
          />
        ))}
    </g>
  );
}
