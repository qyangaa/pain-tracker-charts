import React, { useRef, useContext } from "react";
import { ChartContainer, ContainerContext } from "./common/ChartContainer";
import InnerTest from "./InnerTest";

export default function Test() {
  return (
    <ChartContainer>
      <InnerTest />
    </ChartContainer>
  );
}
