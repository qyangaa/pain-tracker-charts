import React, { useEffect, useState, useCallback } from "react";
import { setToken } from "../graphql/requests";
import Trend from "./Trend";
import Contribution from "./Contribution";
import Test from "./Test";
import MonthSelector from "./common/MonthSelector";
import useIndex from "../hooks/useIndex";

const defaultMonthsSelections = [
  { name: "1W", month: 0.25 },
  { name: "1M", month: 1 },
  { name: "3M", month: 3 },
  { name: "6M", month: 6 },
  { name: "1Y", month: 12 },
];

export default function Report({
  match,
  monthsSelections = defaultMonthsSelections,
}) {
  const [months, setMonths] = useState(3);
  const topics = [
    {
      name: "Test",
      render: <Test months={months} />,
    },
    {
      name: "Trend",
      render: <Trend months={months} />,
    },
    {
      name: "Contribution",
      render: <Contribution months={months} />,
    },
    {
      name: "More",
      render: (
        <div className="full-page">
          <h1>More graphs to come!</h1>
        </div>
      ),
    },
  ];
  const [topicIdx, nextIdx, prevIdx] = useIndex({ length: topics.length });

  useEffect(() => {
    setToken(match.params.token);
  }, [match.params.token]);

  return (
    <>
      <div className="topic-selector">
        <button onClick={nextIdx}>{`<`}</button>
        <h1 className="topic-text">{topics[topicIdx].name}</h1>
        <button onClick={prevIdx}>{`>`}</button>
      </div>
      {topics[topicIdx].render}
      <MonthSelector
        monthsSelections={monthsSelections}
        curMonths={months}
        setCurMonths={setMonths}
      />
    </>
  );
}
