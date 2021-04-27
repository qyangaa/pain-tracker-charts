import React, { useState, useEffect } from "react";
import { csv, json } from "d3";

export default function useData({
  request = async () => {},
  dataTransform = (d) => d,
  initialArguments = {},
  initialData = [],
}) {
  const [data, setData] = useState(initialData);
  const [curArgumenmts, setCurArgumenmts] = useState(initialArguments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    try {
      let curData = await request(curArgumenmts);
      for (let series of curData.seriesData) {
        for (let d of series.data) {
          dataTransform(d);
        }
      }
      setData(curData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [curArgumenmts]);

  const setArguments = (newArguments) => {
    setCurArgumenmts(newArguments);
  };

  return [data, setArguments, isLoading];
}
