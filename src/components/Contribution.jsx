import React, { useEffect, useState } from "react";
import { getPieChart, getPieChartSelections } from "../graphql/requests";
import useData from "../hooks/useData";

import PieChart from "./charts/PieChart";
import ModalSelectButton from "./common/ModalSelectButton";
import {
  extensions,
  initialExtension,
  initialCategories,
  initialOptions,
} from "../assets/defaultValues";

export default function Contribution({ months }) {
  const [categories, setCategories] = useState(initialCategories);
  const [options, setOptions] = useState(initialOptions);

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
    request: getPieChart,
    initialArguments: {
      categoryId: 3,
      categoryName: "exercises",
      optionId: 16,
      optionName: "better pain",
      numMonths: 3,
      extension: initialExtension.extension,
    },
    dataTransform: (d) => {},
  });

  useEffect(() => {
    setDataArguments({ numMonths: months });
  }, [months]);

  return (
    <>
      {!isDataLoading ? (
        <PieChart data={data.seriesData[0]} title={data.title} />
      ) : (
        <h1>Loading ...</h1>
      )}
      <div className="contribution-selector">
        <ModalSelectButton
          initialSelection={initialExtension}
          options={extensions}
          onSelectOption={(d) => setDataArguments({ extension: d.extension })}
        />
        <h3>of</h3>
        <ModalSelectButton
          initialSelection={categories[0]}
          options={categories}
          onSelectOption={(d) =>
            setDataArguments({
              categoryId: d._id,
              categoryName: d.name,
            })
          }
        />
        <h3>to</h3>
        <ModalSelectButton
          initialSelection={options[0]}
          options={options}
          onSelectOption={(d) =>
            setDataArguments({ optionId: d._id, optionName: d.name })
          }
        />
      </div>
    </>
  );
}
