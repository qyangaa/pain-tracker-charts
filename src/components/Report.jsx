import React, { useEffect, useState } from "react";
import {
  getPainDayData,
  getDailyTotal,
  getContribution,
  setToken,
} from "../graphql/requests";
import useData from "../hooks/useData";

import TimeTrendChart from "./charts/TimeTrendChart";

export default function Report({ match }) {
  useEffect(() => {
    setToken(match.params.token);
  }, []);

  const [painDayData, setPainDayArguments, isLoading] = useData({
    request: getPainDayData,
    initialArguments: { numMonths: "3" },
    dataTransform: (d) => {
      d.x = new Date(parseInt(d.x));
    },
  });
  //   console.log(painDayData);
  return (
    <>
      {!isLoading ? (
        <TimeTrendChart data={painDayData} />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
}
