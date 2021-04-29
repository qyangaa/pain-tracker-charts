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
import ColorLegend from "../shapes/ColorLegend";
import _ from "lodash";

const colors = ["#9ACFDD", "#6b8f67", "#F28A80", "#F2ADA7", "#D9BACE"];

const style = {
  margin: { top: 0.2, bottom: 0.1, left: 0.05, right: 0.05 },
  mark: {
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

export default function TimeTrendChart({ dataSet }) {
  const [clickedSeries, setClickedSeries] = useState(null);
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

  const xScale = useMemo(() => {
    let xmin = Number.MAX_VALUE;
    let xmax = Number.MIN_VALUE;
    for (let data of dataSet) {
      for (let series of data.seriesData) {
        xmin = Math.min(series.xmin);
        xmax = Math.max(series.xmax);
      }
    }
    return scaleTime()
      .domain([new Date(xmin), new Date(xmax)])
      .range([0, width]);
  }, [dataSet, width]);

  const renderSeries = (series, xScale, color, idx) => {
    const lineData = series.data;
    const yScale = scaleLinear()
      .domain(extent(lineData, (d) => d.y))
      .range([height, 0])
      .nice();
    const markStyle = _.cloneDeep(style.mark);
    markStyle.path.stroke = color;
    markStyle.circle.fill = color + "99";
    const tooltipStyle = style.tooltipStyle;
    if (!lineData.length)
      return <h1>No data available in current selection</h1>;
    return (
      <LineMarks
        data={lineData}
        xScale={xScale}
        yScale={yScale}
        xAccessor={(d) => d.x}
        yAccessor={(d) => d.y}
        style={markStyle}
        tootipFormat={yFormat}
        tooltipStyle={tooltipStyle}
        displayCircle
        key={idx}
        active={!clickedSeries || clickedSeries == series.ylabel}
      />
    );
  };

  const renderAllLines = () => {
    let curIdx = 0;
    const lines = [];
    const legends = [];
    for (let data of dataSet) {
      for (let series of data.seriesData) {
        if (series.data.length === 0) continue;
        lines.push(renderSeries(series, xScale, colors[curIdx], curIdx));
        legends.push({ color: colors[curIdx], text: series.ylabel });
        curIdx++;
      }
    }
    // console.log({ lines });
    if (lines.length === 0) {
      console.log("here");
      return (
        <text style={{ fontSize: 30, fontFamily: "Indie Flower" }}>
          No data available
        </text>
      );
    }

    return (
      <>
        {lines}{" "}
        <ColorLegend
          legends={legends}
          width={width}
          clickedSeries={clickedSeries}
          onClick={setClickedSeries}
        />
      </>
    );
  };

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
            {renderAllLines()}
          </g>
        </svg>
      </div>
    </>
  );
}
