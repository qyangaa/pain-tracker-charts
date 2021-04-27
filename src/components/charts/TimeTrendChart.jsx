import React from "react";
import {
  csv,
  scaleLinear,
  max,
  format,
  extent,
  scaleTime,
  timeFormat,
} from "d3";

import LineMarks from "../shapes/LineMarks";
import AxisLeft from "../shapes/AxisLeft";
import AxisBottom from "../shapes/AxisBottom";

const style = {
  margin: { top: 0.2, bottom: 0.2, left: 0.1, right: 0.1 },
  mark: {
    path: {
      stroke: "#137B80",
      strokeWidth: 5,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    },

    circle: {
      fill: "#137B80",
      circleRadius: 4,
    },
  },
  axisBottom: {
    lineStroke: "#C0C0BB",
    tickOffset: 1,
    text: {
      fill: "#635F5D",
      fontFamily: "Poppins",
    },
  },
  axisLeft: {
    lineStroke: "#C0C0BB",
    tickOffset: -10,
    text: {
      fill: "#635F5D",
      fontFamily: "Poppins",
    },
  },
  xlabel: {
    fontSize: "1.5em",
    fill: "#635F5D",
  },
  tooltipStyle: {
    fontSize: "1em",
  },
};

const xtickFormat = timeFormat("%a");

export default function TimeTrendChart({ data }) {
  const series = data.seriesData[0];
  const lineData = series.data;
  const width =
    window.innerWidth * (1 - style.margin.left - style.margin.right);
  const height =
    window.innerHeight * (1 - style.margin.top - style.margin.bottom);

  const xScale = scaleTime()
    .domain(extent(lineData, (d) => d.x))
    .range([0, width])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(lineData, (d) => d.y))
    .range([0, height])
    .nice();
  // console.log(data);
  return (
    <div style={style.container}>
      <svg
        width={width + window.innerWidth * style.margin.left + 5}
        height={height + window.innerHeight * style.margin.top + 5}
      >
        <g
          transform={`translate(${window.innerWidth * style.margin.left}, ${
            window.innerHeight * style.margin.top
          })`}
        >
          <AxisLeft
            yScale={yScale}
            width={width}
            height={height}
            style={style.axisLeft}
            yScaleAccessor="ticks"
            // grid
          />
          <LineMarks
            data={lineData}
            xScale={xScale}
            yScale={yScale}
            xAccessor={(d) => d.x}
            yAccessor={(d) => d.y}
            style={style.mark}
            tootipFormat={xtickFormat}
            tooltipStyle={style.tooltipStyle}
            displayCircle
          />
        </g>
      </svg>
    </div>
  );
}
