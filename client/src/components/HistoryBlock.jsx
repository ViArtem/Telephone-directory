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
              <div key={Math.random()} className="historyItem">
                <p key={Math.random()}>
                  {li.action} <br />
                  {new Date(Number(li.time)).toLocaleTimeString()}
                  {" --- "}
                  {new Date(Number(li.time)).toLocaleDateString()}
                </p>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default HistoryBlock;
