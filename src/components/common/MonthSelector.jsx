import React from "react";

export default function MonthSelector({
  monthsSelections,
  curMonths,
  setCurMonths,
}) {
  return (
    <div className="spanButtons">
      {monthsSelections.map((m, i) => (
        <button
          className={curMonths === m.month ? "active" : ""}
          key={i}
          onClick={() => setCurMonths(m.month)}
        >
          {m.name}
        </button>
      ))}
    </div>
  );
}
