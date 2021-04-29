import React, { useEffect, useState } from "react";
import { getPainDayData, getDailyTotal } from "../graphql/requests";
import useData from "../hooks/useData";

import TimeTrendChartMultiLines from "./charts/TimeTrendChartMultiLines";

export default function Trend({ months, setMonths }) {
  const [
    painDayData,
    painDayArguments,
    setPainDayArguments,
    isPainDayLoading,
  ] = useData({
    request: getPainDayData,
    initialArguments: { numMonths: "3" },
    dataTransform: (d) => {
      d.x = new Date(parseInt(d.x));
    },
  });

  const [
    dailyTotalData,
    dailyTotalArguments,
    setDailyTotalArguments,
    isDailyTotalLoading,
  ] = useData({
    request: getDailyTotal,
    initialArguments: {
      categoryId: "3",
      categoryName: "exercises",
      numMonths: "3",
      type: "duration",
    },
    dataTransform: (d) => {
      d.x = new Date(parseInt(d.x));
    },
  });

  useEffect(() => {
    setPainDayArguments({ months });
    setDailyTotalArguments({ months });
  }, [months]);

  return (
    <>
      {!isPainDayLoading && !isDailyTotalLoading ? (
        <TimeTrendChartMultiLines dataSet={[painDayData, dailyTotalData]} />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
}
