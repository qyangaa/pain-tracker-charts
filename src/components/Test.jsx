import React, { useRef } from "react";
import ReactRough, { Rectangle } from "react-rough";

export default function Test() {
  const ref = useRef();
  console.log(ref);
  return (
    <ReactRough>
      <Rectangle ref={ref} x={15} y={15} width={90} height={80} fill="red" />
    </ReactRough>
  );
}
