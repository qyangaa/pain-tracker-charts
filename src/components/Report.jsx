import React, { useEffect, useState } from "react";
import { setToken } from "../graphql/requests";
import Trend from "./Trend";
import Contribution from "./Contribution";

const monthsSelections = [
  { name: "1W", month: "0.25" },
  { name: "1M", month: "1" },
  { name: "3M", month: "3" },
  { name: "6M", month: "6" },
  { name: "1Y", month: "12" },
];

export default function Report({ match }) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [months, setMonths] = useState("3");
  const topics = [
    {
      name: "Trend",
      render: <Trend months={months} setMonths={setMonths} />,
    },
    {
      name: "Contribution",
      render: <Contribution months={months} setMonths={setMonths} />,
    },
    { name: "Count", render: <h1>Count</h1> },
    { name: "What else?", render: <h1>What else?</h1> },
  ];

  useEffect(() => {
    setToken(match.params.token);
  }, []);

  return (
    <>
      <div className="topic-selector">
        <button
          onClick={() => {
            setTopicIdx((topicIdx - 1 + topics.length) % topics.length);
          }}
        >{`<`}</button>
        <h1 className="topic-text">{topics[topicIdx].name}</h1>
        <button
          onClick={() => {
            setTopicIdx((topicIdx + 1) % topics.length);
          }}
        >{`>`}</button>
      </div>
      {topics[topicIdx].render}
      <div className="spanButtons">
        {monthsSelections.map((m, i) => (
          <button
            className={months === m.month ? "active" : ""}
            key={i}
            onClick={() => setMonths(m.month)}
          >
            {m.name}
          </button>
        ))}
      </div>
    </>
  );
}
