import React, { useEffect, useState } from "react";
import {
  getPainDayData,
  getDailyTotal,
  getContribution,
  setToken,
} from "../graphql/requests";
import useData from "../hooks/useData";

import TimeTrendChartMultiLines from "./charts/TimeTrendChartMultiLines";

export default function Report({ match }) {
  useEffect(() => {
    setToken(match.params.token);
  }, []);

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

  const setMonths = (numMonths) => {
    setPainDayArguments({ numMonths });
    setDailyTotalArguments({ numMonths });
  };

  return (
    <>
      <div className="topic-selector">
        <h1 style={{ fontFamily: "Indie Flower" }}>Topic selector Holder</h1>
      </div>
      {!isPainDayLoading && !isDailyTotalLoading ? (
        <>
          <TimeTrendChartMultiLines dataSet={[painDayData, dailyTotalData]} />
          <div className="timeSpanButtons">
            <button onClick={() => setMonths("0.25")}>1W</button>
            <button onClick={() => setMonths("1")}>1M</button>
            <button onClick={() => setMonths("3")}>3M</button>
            <button onClick={() => setMonths("6")}>6M</button>
            <button onClick={() => setMonths("12")}>1Y</button>
          </div>
        </>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
}
