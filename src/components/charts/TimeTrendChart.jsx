import React, { useRef, useState, useEffect, useMemo } from "react";
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
  margin: { top: 0.1, bottom: 0.1, left: 0.05, right: 0.05 },
  mark: {
    path: {
      stroke: "#137B80",
      strokeWidth: 5,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    },

    circle: {
      fill: "#137B8099",
      circleRadius: 9,
    },
  },
  axisBottom: {
    lineStroke: "#C0C0BB",
    tickOffset: 8,
    text: {
      fill: "#635F5D",
      fontFamily: "Indie Flower",
      fontSize: "20",
    },
  },
  axisLeft: {
    lineStroke: "#C0C0BB",
    tickOffset: -10,
    text: {
      fill: "#635F5D",
      fontFamily: "Indie Flower",
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

const xtickFormat = timeFormat("%-m/%-d");

export default function TimeTrendChart({ data }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [margin, setMargin] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const _containerWidth = containerRef.current.clientWidth;
    const _containerHeight = containerRef.current.clientHeight;
    const _margin = {
      left: containerWidth * style.margin.left,
      top: containerHeight * style.margin.top,
      right: containerWidth * style.margin.right,
      bottom: containerHeight * style.margin.bottom,
    };
    const _width = Math.max(_containerWidth - _margin.right - _margin.left, 0);
    const _height = Math.max(
      _containerHeight - _margin.top - _margin.bottom,
      0
    );
    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setMargin(_margin);
    setWidth(_width);
    setHeight(_height);
  }, [containerRef, containerRef.current]);

  const series = data.seriesData[0];
  const lineData = series.data;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(lineData, (d) => d.x))
        .range([0, width]),
    [lineData, width]
  );
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(lineData, (d) => d.y))
        .range([height, 0])
        .nice(),
    [lineData, height]
  );

  return (
    <>
      <div
        className="chart-container"
        style={{
          width: "90%",
          height: "80%",
          margin: "0% 5% 0% 5%",
          // backgrundColor: "blue",
        }}
        ref={containerRef}
      >
        {lineData.length ? (
          <svg width={containerWidth} height={containerHeight}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <AxisBottom
                xScale={xScale}
                width={width}
                height={height}
                style={style.axisBottom}
                tickFormat={xtickFormat}
                grid
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
        ) : (
          <h1>No data available in current selection</h1>
        )}
      </div>
    </>
  );
}
