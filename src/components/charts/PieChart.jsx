import React, { useContext, useState, useEffect } from "react";
import { pie, arc, scaleOrdinal, schemeCategory10 } from "d3";
import { ContainerContext } from "../common/ChartContainer";

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
  const { containerWidth, containerHeight, width, height, margin } =
    useContext(ContainerContext);

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
    </>
  );
}
