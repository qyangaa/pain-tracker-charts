import React, { useRef, useState, useEffect } from "react";
import { containerStyle as style } from "../../assets/styles";

import _ from "lodash";

export const ContainerContext = React.createContext({});

export function ChartContainer(props) {
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

  return (
    <>
      <div
        className="chart-container"
        style={{
          width: "90%",
          height: "50%",
          margin: "0% 5% 0% 5%",
        }}
        ref={containerRef}
      >
        <ContainerContext.Provider
          value={{ containerWidth, containerHeight, width, height, margin }}
        >
          {props.children}
        </ContainerContext.Provider>
      </div>
    </>
  );
}
