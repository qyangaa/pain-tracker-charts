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
  mark1: {
    path: {
      stroke: "#9ACFDD",
      strokeWidth: 5,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    },

    circle: {
      fill: "#9ACFDD99",
      circleRadius: 9,
    },
  },
  mark2: {
    path: {
      stroke: "#6b8f67",
      strokeWidth: 5,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    },

    circle: {
      fill: "#6b8f6799",
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
    fontSize: "2em",
    fontWeight: "bold",
    fill: "#FFF",
    fontFamily: "Indie Flower",
  },
};

const xtickFormat = timeFormat("%-m/%-d");
const yFormat = (y) => y.toFixed(1);

export default function TimeTrendChart({ data1, data2 }) {
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

  const series1 = data1.seriesData[0];
  const lineData1 = series1.data;
  const series2 = data2.seriesData[0];
  const lineData2 = series2.data;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(lineData1, (d) => d.x))
        .range([0, width]),
    [lineData1, width]
  );
  const yScale1 = useMemo(
    () =>
      scaleLinear()
        .domain(extent(lineData1, (d) => d.y))
        .range([height, 0])
        .nice(),
    [lineData1, height]
  );
  const yScale2 = useMemo(
    () =>
      scaleLinear()
        .domain(extent(lineData2, (d) => d.y))
        .range([height, 0])
        .nice(),
    [lineData2, height]
  );

  const renderSeries = (data, xScale, style, tooltipStyle) => {
    const series = data.seriesData[0];
    const lineData = series.data;
    const yScale = scaleLinear()
      .domain(extent(lineData, (d) => d.y))
      .range([height, 0])
      .nice();
    return (
      <LineMarks
        data={lineData}
        xScale={xScale}
        yScale={yScale}
        xAccessor={(d) => d.x}
        yAccessor={(d) => d.y}
        style={style}
        tootipFormat={yFormat}
        tooltipStyle={tooltipStyle}
        displayCircle
      />
    );
  };

  // console.log(lineData2);
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
        {lineData1.length ? (
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
                data={lineData1}
                xScale={xScale}
                yScale={yScale1}
                xAccessor={(d) => d.x}
                yAccessor={(d) => d.y}
                style={style.mark1}
                tootipFormat={yFormat}
                tooltipStyle={style.tooltipStyle}
                displayCircle
              />
              <LineMarks
                data={lineData2}
                xScale={xScale}
                yScale={yScale2}
                xAccessor={(d) => d.x}
                yAccessor={(d) => d.y}
                style={style.mark2}
                tootipFormat={yFormat}
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
