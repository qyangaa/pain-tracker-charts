import React, { useRef, useState, useEffect, useMemo } from "react";
import { pie, arc, scaleOrdinal, schemeCategory10, format } from "d3";

import Arc from "../shapes/Arc";
import _ from "lodash";
import { max, LightenDarkenColor } from "../../utils/helper";

const colors = ["#9ACFDD", "#6b8f67", "#F28A80", "#F2ADA7", "#D9BACE"];

const style = {
  margin: { top: 0.2, bottom: 0.1, left: 0.05, right: 0.05 },
  pie: { innerRadiusScale: 6, outerRadiusScale: 2.5 },
  title: {},
};

export default function PieChart({ data, title }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const [message, setMessage] = useState("");
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

  const createPie = pie().value((d) => d.y);
  const innerRadius = containerWidth / style.pie.innerRadiusScale;
  const outerRadius = containerWidth / style.pie.outerRadiusScale;
  const createArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const colorScale = scaleOrdinal(schemeCategory10);
  const colors = data.data.map((d, idx) => colorScale(idx));

  useEffect(async () => {
    if (!data.data || data.data.length === 0) return;
    const { maxVal, maxIdxs } = max(data.data, (d) => d.y);

    // console.log(maxIdx);
    let curIdx = 0;
    setMessage("Top contributor: ");
    setActiveIdx(maxIdxs[curIdx]);
    let interval = setInterval(() => {
      if (curIdx < maxIdxs.length - 1) {
        curIdx += 1;
        setActiveIdx(maxIdxs[curIdx]);
      } else {
        setActiveIdx(null);
        setMessage(null);
        clearInterval(interval);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <>
      <div
        className="chart-container"
        style={{
          width: "90%",
          height: "60%",
          margin: "auto 5% 0% 5%",
          position: "absolute",
          bottom: "15%",
          // backgrundColor: "blue",
        }}
        ref={containerRef}
      >
        {data.data.length !== 0 ? (
          <svg width={containerWidth} height={containerHeight}>
            <g
              transform={`translate(${containerWidth / 2}, ${
                containerHeight / 2
              })`}
            >
              <text
                fill={colors[activeIdx]}
                y={-containerHeight / 2.7}
                style={{ fontSize: 45, textAnchor: "middle" }}
              >
                {message}
              </text>
              {pie()
                .value((d) => d.y)(data.data)
                .map((d, idx) => (
                  <Arc
                    color={colors[idx]}
                    value={d}
                    idx={idx}
                    key={idx}
                    createArc={createArc}
                    activeIdx={activeIdx}
                    setActiveIdx={setActiveIdx}
                  />
                ))}
              <g>
                <text
                  fill="#DDDDDD"
                  y={-1}
                  style={{ fontSize: 40, textAnchor: "middle" }}
                >
                  {data.data[activeIdx] && data.data[activeIdx].x}
                </text>
                <text
                  fill="#DDDDDD"
                  y={37}
                  style={{ fontSize: 40, textAnchor: "middle" }}
                >
                  {data.data[activeIdx] && data.data[activeIdx].y + "%"}
                </text>
                <text
                  fill={colors[activeIdx]}
                  y={-5}
                  style={{ fontSize: 40, textAnchor: "middle" }}
                >
                  {data.data[activeIdx] && data.data[activeIdx].x}
                </text>
                <text
                  fill={colors[activeIdx]}
                  y={40}
                  style={{ fontSize: 40, textAnchor: "middle" }}
                >
                  {data.data[activeIdx] && data.data[activeIdx].y + "%"}
                </text>
              </g>
            </g>
          </svg>
        ) : (
          <h1>No data available in current selection</h1>
        )}
      </div>
    </>
  );
}
