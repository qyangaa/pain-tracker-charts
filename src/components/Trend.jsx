import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getLineChart, getLineChartSelections } from "../graphql/requests";
import useData from "../hooks/useData";

import { ChartContainer } from "./common/ChartContainer";
import TimeTrendChartMultiLines from "./charts/TimeTrendChartMultiLines";
import ModalSelectButton from "./common/ModalSelectButton";
import { lineColors1, lineColors2 } from "../assets/colors";

export default function Trend({ months }) {
  const [colors, setColors] = useState([lineColors1[0], lineColors2[0]]);
  const [selections, setSelections] = useState([]);

  useEffect(async () => {
    try {
      const newSelections = await getLineChartSelections();
      setSelections(newSelections);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [firstData, firstArguments, setFirstArguments, isFirstLoading] =
    useData({
      request: getLineChart,
      initialArguments: { numMonths: 1, type: "mood level" },
      dataTransform: (d) => {
        d.x = new Date(parseInt(d.x));
      },
    });

  const [secondData, secondArguments, setSecondArguments, isSecondLoading] =
    useData({
      request: getLineChart,
      initialArguments: { numMonths: 1, type: "exercise duration" },
      dataTransform: (d) => {
        d.x = new Date(parseInt(d.x));
      },
    });

  useEffect(() => {
    setFirstArguments({ numMonths: months });
    setSecondArguments({ numMonths: months });
  }, [months]);

  useEffect(() => {
    const newColors = [];
    newColors.push(_.sample(lineColors1));
    newColors.push(_.sample(lineColors2));
    setColors(newColors);
  }, [firstArguments.type, secondArguments.type]);

  return (
    <>
      {!isFirstLoading && !isSecondLoading ? (
        <ChartContainer>
          <TimeTrendChartMultiLines
            dataSet={[firstData, secondData]}
            colors={colors}
          />
        </ChartContainer>
      ) : (
        <h1>Loading ...</h1>
      )}
      <div className="contribution-selector">
        <ModalSelectButton
          initialSelection={{ name: firstArguments.type }}
          options={selections}
          onSelectOption={(d) => setFirstArguments({ type: d.name })}
          color={colors[0]}
        />
        <h3> vs </h3>
        <ModalSelectButton
          initialSelection={{ name: secondArguments.type }}
          options={selections}
          onSelectOption={(d) => setSecondArguments({ type: d.name })}
          color={colors[1]}
        />
      </div>
    </>
  );
}
