import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import { scaleLinear, extent, scaleTime, timeFormat } from "d3";

import { ContainerContext } from "../common/ChartContainer";
import LineMarks from "../shapes/LineMarks";
import AxisBottom from "../shapes/AxisBottom";
import ColorLegend from "../shapes/ColorLegend";
import _ from "lodash";

import { timeTrendChartStyle as style } from "../../assets/styles";

const xtickFormat = timeFormat("%-m/%-d");

export default function TimeTrendChart({ dataSet, colors }) {
  const [clickedSeries, setClickedSeries] = useState(null);
  const { containerWidth, containerHeight, width, height, margin } =
    useContext(ContainerContext);

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
        tootipFormat={(y) => `${y.toFixed(1)} ${series.yunit}`}
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
    if (lines.length === 0) {
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
    </>
  );
}
