import React, { useEffect, useState, useCallback } from "react";
import { setToken } from "../graphql/requests";
import Trend from "./Trend";
import Contribution from "./Contribution";
import MonthSelector from "./common/MonthSelector";

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
  const [topicIdx, setTopicIdx] = useState(0);
  const [months, setMonths] = useState(3);
  const topics = [
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

  useEffect(() => {
    setToken(match.params.token);
  }, []);

  const handlePrevTopic = useCallback(() => {
    setTopicIdx((topicIdx - 1 + topics.length) % topics.length);
  }, [topicIdx]);

  const handleNextTopic = useCallback(() => {
    setTopicIdx((topicIdx + 1) % topics.length);
  }, [topicIdx]);

  return (
    <>
      <div className="topic-selector">
        <button onClick={handlePrevTopic}>{`<`}</button>
        <h1 className="topic-text">{topics[topicIdx].name}</h1>
        <button onClick={handleNextTopic}>{`>`}</button>
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
