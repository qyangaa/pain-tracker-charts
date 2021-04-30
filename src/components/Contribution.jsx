import React, { useEffect, useState } from "react";
import { getContribution, getPieChartSelections } from "../graphql/requests";
import useData from "../hooks/useData";

import PieChart from "./charts/PieChart";
import Modal from "./common/Modal";

const initialCategories = [
  { id: "3", name: "exercises" },
  { id: "2", name: "mood" },
];

const initialOptions = [
  { id: "16", name: "better pain" },
  { id: "17", name: "worse pain" },
];

export default function Contribution({ months, setMonths }) {
  const [categories, setCategories] = useState(initialCategories);
  const [options, setOptions] = useState(initialOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selections, setSelections] = useState([]);
  const [onSelect, setOnSelect] = useState(() => {});
  console.log(options);
  useEffect(async () => {
    try {
      const data = await getPieChartSelections();
      setCategories(data.categories);
      setOptions(data.options);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [data, dataArguments, setDataArguments, isDataLoading] = useData({
    request: getContribution,
    initialArguments: {
      categoryId: 3,
      categoryName: "exercises",
      optionId: 16,
      optionName: "better pain",
      numMonths: "3",
      extension: "5",
    },
    dataTransform: (d) => {},
  });

  useEffect(() => {
    setDataArguments({ numMonths: months });
  }, [months]);

  const handleClickCategory = () => {
    setSelections(categories);
    setOnSelect(() => (d) => {
      setDataArguments({
        categoryId: d.id,
        categoryName: d.name,
      });
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  const handleClickOption = () => {
    setSelections(options);
    setOnSelect(() => (d) => {
      setDataArguments({ optiopnId: d.id, optionName: d.name });
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="contribution-selector">
        <button onClick={handleClickCategory}>
          {dataArguments.categoryName}
        </button>
        <h3>to</h3>
        <button onClick={handleClickOption}>{dataArguments.optionName}</button>
      </div>
      {!isDataLoading ? (
        <PieChart data={data.seriesData[0]} title={data.title} />
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
