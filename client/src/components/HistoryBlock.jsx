import React from "react";

import "../styles/App.css";
const HistoryBlock = ({ styleClass, historyList }) => {
  let className = "history";

  if (styleClass) {
    className += styleClass.styleClass;
  }

  return (
    <div className={className}>
      <h1
        style={{
          fontSize: "25px",
          color: "white",
          color: "rgba(39, 38, 67, 1)",
        }}
      >
        History
      </h1>
      {historyList
        ? historyList.map((li) => {
            return (
              <p key={Math.random()} style={{}}>
                {li.action}:{" "}
                {new Date(li.time * 1000).toISOString().slice(14, 22)}
              </p>
            );
          })
        : ""}
    </div>
  );
};

export default HistoryBlock;
