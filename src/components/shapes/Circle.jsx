import React, { useState, useEffect } from "react";

export default function Circle({
  x,
  y,
  style,
  tooltipStyle,
  tootipFormat,
  clickable,
}) {
  const [isActive, setIsActive] = useState(false);

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
          <circle cx={x} cy={y - 50} r={style.circleRadius * 5} style={style} />
          <text
            x={x}
            y={y - 50 + 8}
            style={{
              ...tooltipStyle,
              textAnchor: "middle",
            }}
          >
            {tootipFormat(x, y)}
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
