import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getLineChart, getLineChartSelections } from "../graphql/requests";
import useData from "../hooks/useData";

import TimeTrendChartMultiLines from "./charts/TimeTrendChartMultiLines";
import Modal from "./common/Modal";

const initalColors = ["#9ACFDD", "#6b8f67"];
const colors1 = ["#032F40", "#4F8C7B", "#36688B", "#229BA6"];
const colors2 = ["#F27405", "#D95204", "#FF9A69", "#E86A5F"];

export default function Trend({ months, setMonths }) {
  const [colors, setColors] = useState(initalColors);
  const [selections, setSelections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSelect, setOnSelect] = useState(() => {});

  useEffect(async () => {
    try {
      const newSelections = await getLineChartSelections();
      setSelections(newSelections);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [
    firstData,
    firstArguments,
    setFirstArguments,
    isFirstLoading,
  ] = useData({
    request: getLineChart,
    initialArguments: { numMonths: "1", type: "mood level" },
    dataTransform: (d) => {
      d.x = new Date(parseInt(d.x));
    },
  });

  const [
    secondData,
    secondArguments,
    setSecondArguments,
    isSecondLoading,
  ] = useData({
    request: getLineChart,
    initialArguments: { numMonths: "1", type: "exercise duration" },
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
    newColors.push(_.sample(colors1));
    newColors.push(_.sample(colors2));
    setColors(newColors);
  }, [firstArguments.type, secondArguments.type]);

  const handleClickSelection = (idx) => {
    let setter;
    if (idx === 1) setter = setFirstArguments;
    if (idx === 2) setter = setSecondArguments;
    setOnSelect(() => (d) => {
      setter({ type: d.name });
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="contribution-selector">
        <button
          onClick={() => handleClickSelection(1)}
          style={{ backgroundColor: colors[0] }}
        >
          {firstArguments.type}
        </button>
        <h3> vs </h3>
        <button
          onClick={() => handleClickSelection(2)}
          style={{ backgroundColor: colors[1] }}
        >
          {secondArguments.type}
        </button>
      </div>
      {!isFirstLoading && !isSecondLoading ? (
        <TimeTrendChartMultiLines
          dataSet={[firstData, secondData]}
          colors={colors}
        />
      ) : (
        <h1>Loading ...</h1>
      )}

      {isModalOpen && (
        <Modal
          selections={selections}
          onSelect={onSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
