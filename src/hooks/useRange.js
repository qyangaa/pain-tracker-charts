import React, { useState } from "react";

export default function useRange() {
  const [range, setRange] = useState({
    xmin: Number.MAX_VALUE,
    xmax: Number.MIN_VALUE,
    ymin: Number.MAX_VALUE,
    ymax: Number.MIN_VALUE,
  });

  const update = ({ x, y }) => {
    const newRange = {};
    console.log(range, x);
    newRange.xmin = Math.min(range.xmin, x);
    newRange.xmax = Math.max(range.xmax, x);
    newRange.ymin = Math.min(range.ymin, y);
    newRange.ymax = Math.max(range.ymax, y);
    setRange(newRange);
  };

  return [range, update];
}
