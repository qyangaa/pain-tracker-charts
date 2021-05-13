import React, { useState, useEffect } from "react";

export default function useData({
  request = async () => {},
  dataTransform = (d) => d,
  initialArguments = {},
  initialData = [],
}) {
  const [data, setData] = useState(initialData);
  const [curArguments, setCurArguments] = useState(initialArguments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    try {
      let curData = await request(curArguments);
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
  }, [curArguments]);

  const setArguments = (newArguments) => {
    setCurArguments({ ...curArguments, ...newArguments });
  };

  return [data, curArguments, setArguments, isLoading];
}
