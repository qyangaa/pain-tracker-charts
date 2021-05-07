import React, { useEffect, useState } from "react";
import { getContribution, getPieChartSelections } from "../graphql/requests";
import useData from "../hooks/useData";

import PieChart from "./charts/PieChart";
import Modal from "./common/Modal";

const initialCategories = [
  { _id: "3", name: "exercises" },
  { _id: "2", name: "mood" },
];

const initialOptions = [
  { _id: "16", name: "better pain" },
  { _id: "17", name: "worse pain" },
];

const extensions = [
  { extension: 1 / 30, name: "1 day" },
  { extension: 3 / 30, name: "3 days" },
  { extension: 7 / 30, name: "1 week" },
  { extension: 1, name: "1 month" },
  { extension: 3, name: "3 months" },
];

export default function Contribution({ months, setMonths }) {
  const [categories, setCategories] = useState(initialCategories);
  const [options, setOptions] = useState(initialOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selections, setSelections] = useState([]);
  const [onSelect, setOnSelect] = useState(() => {});
  const [extension, setExtension] = useState({
    extension: 1,
    name: "1 month",
  });

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
      numMonths: 3,
      extension: extension.extension,
    },
    dataTransform: (d) => {},
  });

  useEffect(() => {
    setDataArguments({ numMonths: months });
  }, [months, extension]);

  const handleClickCategory = () => {
    setSelections(categories);
    setOnSelect(() => (d) => {
      setDataArguments({
        categoryId: d._id,
        categoryName: d.name,
      });
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  const handleClickOption = () => {
    setSelections(options);
    setOnSelect(() => (d) => {
      setDataArguments({ optionId: d._id, optionName: d.name });
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };

  const handleClickExtension = () => {
    setSelections(extensions);
    setOnSelect(() => (d) => {
      setDataArguments({ extension: d.extension });
      setExtension(d);
      setIsModalOpen(false);
    });
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="contribution-selector">
        <button onClick={handleClickExtension}>{extension.name}</button>
        <h3>of</h3>
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
