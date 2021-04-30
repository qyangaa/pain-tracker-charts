import React, { useState, useEffect } from "react";

export default function Circle({
  x,
  y,
  yData,
  style,
  xRange,
  yRange,
  tooltipStyle,
  tootipFormat,
  clickable,
}) {
  const [isActive, setIsActive] = useState(false);

  const getTooltipCoord = () => {
    let tooltipCoord = { x: x, y: y };
    tooltipCoord.x = Math.min(tooltipCoord.x, xRange[1] - 75);
    tooltipCoord.x = Math.max(tooltipCoord.x, xRange[0] + 75);
    tooltipCoord.y = Math.min(tooltipCoord.y, yRange[0] - 25);
    tooltipCoord.y = Math.max(tooltipCoord.y, yRange[1] + 25);
    console.log({ x, y, tooltipCoord });
    return tooltipCoord;
  };

  useEffect(() => {
    let timeout;

    if (isActive) {
      timeout = setTimeout(() => {
        setIsActive(false);
      }, 3000);
      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }
  }, [isActive]);

  return (
    <>
      {isActive && (
        <>
          <rect
            x={getTooltipCoord().x - 75}
            y={getTooltipCoord().y - 50}
            rx="20"
            ry="20"
            width={150}
            height={50}
            style={style}
          />
          <text
            x={getTooltipCoord().x}
            y={getTooltipCoord().y - 17.5}
            style={{
              ...tooltipStyle,
              textAnchor: "middle",
            }}
          >
            {tootipFormat(yData)}
          </text>
        </>
      )}

      <circle cx={x} cy={y} r={style.circleRadius} style={style} />
      <circle
        cx={x}
        cy={y}
        r={style.circleRadius * 2}
        style={{ fill: "transparent" }}
        onClick={() => {
          clickable && setIsActive(!isActive);
        }}
      />
    </>
  );
}
