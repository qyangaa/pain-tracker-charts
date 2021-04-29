import React from "react";

export default function Arc({
  color,
  value,
  idx,
  createArc,
  activeIdx,
  setActiveIdx,
}) {
  return (
    <>
      <g
        opacity={
          activeIdx === null || activeIdx === undefined || activeIdx === idx
            ? 1
            : 0.2
        }
      >
        <path
          fill={color}
          d={createArc(value)}
          onClick={() => {
            activeIdx === idx ? setActiveIdx(null) : setActiveIdx(idx);
          }}
        />
      </g>
    </>
  );
}
