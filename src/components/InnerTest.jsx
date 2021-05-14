import React, { useContext } from "react";
import { ContainerContext } from "./common/ChartContainer";

export default function InnerTest() {
  const context = useContext(ContainerContext);
  console.log(context);
  return <div></div>;
}
