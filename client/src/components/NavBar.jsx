import React, { useState } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import "../styles/App.css";
import Photo from "./UI/photo/Photo";
const NavBar = ({ styleClass, history, historyList }) => {
  let className = "navBar ";
  let userRole;
  let userName;
  if (localStorage.getItem("Authorization")) {
    if (jwt(localStorage.getItem("Authorization"))) {
      userRole = jwt(localStorage.getItem("Authorization")).role;
      userName = jwt(localStorage.getItem("Authorization")).username;
    }
  }
  if (styleClass) {
    className += styleClass.styleClass;
  }

  //admin history

  function getHistory() {
    if (jwt(localStorage.getItem("Authorization"))) {
      if (jwt(localStorage.getItem("Authorization")).role == "admin") {
        axios
          .get("http://localhost:4000/admin/history")
          .then((allContact) => {
            if (allContact) {
              historyList([...allContact.data]);
              history(true);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }

  function exit() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className={className}>
      <Photo>
        <img
          src={`http://localhost:4000/${
            jwt(localStorage.getItem("Authorization")).avatar
          }`}
          style={{
            with: "75px",
            height: " 75px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
          alt="Avatar"
        />
      </Photo>

      <p
        style={{
          fontSize: "16px",
          marginRight: "900px",
          fontWeight: "500",
        }}
      >
        {userName} ({userRole})
      </p>
      {jwt(localStorage.getItem("Authorization")).role == "admin" ? (
        <p
          onClick={getHistory}
          className={"historyLink"}
          style={{ fontSize: "16px", fontWeight: "500" }}
        >
          VIEW HISTORY
        </p>
      ) : (
        ""
      )}
      <p
        onClick={exit}
        className={"exitLink"}
        style={{ fontSize: "16px", fontWeight: "500" }}
      >
        EXIT
      </p>
    </div>
  );
};

export default NavBar;
