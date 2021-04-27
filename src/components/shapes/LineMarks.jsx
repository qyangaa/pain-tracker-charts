import React from "react";
import { curveNatural, curveLinear, line } from "d3";

import Circle from "../shapes/Circle";

const numCircles = 20;

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
  const spacing = Math.ceil(data.length / numCircles);
  return (
    <g>
      <path
        fill="none"
        stroke="black"
        d={line()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d)))
          .curve(curveNatural)(data)}
        style={style.path}
      />
      {displayCircle &&
        data.map(
          (d, idx) =>
            idx % spacing == 0 && (
              <Circle
                x={xScale(xAccessor(d))}
                y={yScale(yAccessor(d))}
                style={style.circle}
                tooltipStyle={tooltipStyle}
                tootipFormat={tootipFormat}
                key={idx}
              />
            )
        )}
    </g>
  );
}
