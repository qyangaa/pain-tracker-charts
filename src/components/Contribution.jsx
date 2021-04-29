import React, { useEffect, useState } from "react";
import { getContribution } from "../graphql/requests";
import useData from "../hooks/useData";

import PieChart from "./charts/PieChart";

export default function Contribution({ months, setMonths }) {
  const [data, dataArguments, setDataArguments, isDataLoading] = useData({
    request: getContribution,
    initialArguments: {
      categoryId: "3",
      categoryName: "exercises",
      optionId: "16",
      optionName: "better pain",
      numMonths: "3",
      extension: "5",
    },
    dataTransform: (d) => {},
  });

  useEffect(() => {
    setDataArguments({ numMonths: months });
  }, [months]);

  return (
    <>
      <h1>Selection place holder</h1>
      {!isDataLoading ? (
        <PieChart data={data.seriesData[0]} title={data.title} />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
}
