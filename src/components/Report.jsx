import React, { useEffect, useState } from "react";
import { setToken } from "../graphql/requests";
import Trend from "./Trend";

export default function Report({ match }) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [months, setMonths] = useState("3");
  const topics = [
    {
      name: "Trend",
      render: <Trend months={months} setMonths={setMonths} />,
    },
    { name: "Contribution", render: <h1>Contribution</h1> },
    { name: "Count", render: <h1>Count</h1> },
  ];

  useEffect(() => {
    setToken(match.params.token);
  }, []);
  console.log(topicIdx);

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
      <div className="timeSpanButtons">
        <button onClick={() => setMonths("0.25")}>1W</button>
        <button onClick={() => setMonths("1")}>1M</button>
        <button onClick={() => setMonths("3")}>3M</button>
        <button onClick={() => setMonths("6")}>6M</button>
        <button onClick={() => setMonths("12")}>1Y</button>
      </div>
    </>
  );
}
