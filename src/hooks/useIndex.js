import React, { useState } from "react";

export default function useIndex({ length, initIdx = 0 }) {
  const [idx, setIdx] = useState(initIdx);
  const nextIdx = () => {
    setIdx((idx - 1 + length) % length);
  };
  const prevIdx = () => {
    setIdx((idx + 1) % length);
  };
  return [idx, nextIdx, prevIdx];
}
