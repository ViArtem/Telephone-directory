import React from "react";
import jwt from "jwt-decode";
import axios from "axios";
import "../styles/App.css";
import Photo from "./UI/photo/Photo";
const NavBar = ({
  styleClass,
  history,
  historyList,
  socketConnection,
  changeListVisible,
  newMessageValue,
}) => {
  let className = "navBar ";
  let userRole;
  let userName;
  if (localStorage.getItem("Authorization")) {
    if (jwt(localStorage.getItem("Authorization"))) {
      userRole = jwt(localStorage.getItem("Authorization")).role;
      userName = jwt(localStorage.getItem("Authorization")).username;
    }
  }

  let classNameSupport = "historyLink";
  if (styleClass) {
    className += styleClass.styleClass;
  }
  if (newMessageValue) {
    //console.log(newMessageValue);
    classNameSupport += " newMessage";
  }

  //admin history
  function getHistory() {
    if (jwt(localStorage.getItem("Authorization"))) {
      if (jwt(localStorage.getItem("Authorization")).role == "admin") {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}admin/history`)
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

  function getUnreadMessage() {
    socketConnection.emit("checking for new messages", {
      role: jwt(localStorage.getItem("Authorization")).role,
    });
    socketConnection.emit("get chat list", {
      role: jwt(localStorage.getItem("Authorization")).role,
    });
  }

  function getChats(e) {
    e.preventDefault();
    changeListVisible(true);

    socketConnection.emit("get chat list", {
      role: jwt(localStorage.getItem("Authorization")).role,
    });

    socketConnection.emit("checking for new messages", {
      role: jwt(localStorage.getItem("Authorization")).role,
    });
  }

  function exit() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className={className}>
      <Photo>
        <img
          src={`${process.env.REACT_APP_SERVER_URL}${
            jwt(localStorage.getItem("Authorization")).avatar
          }`}
          alt="Avatar"
        />
      </Photo>

      <p style={{ marginRight: "690px" }}>
        {userName} ({userRole})
      </p>
      {jwt(localStorage.getItem("Authorization")).role === "admin" ? (
        <p onClick={getChats} className={classNameSupport}>
          SUPPORT
        </p>
      ) : (
        ""
      )}
      {jwt(localStorage.getItem("Authorization")).role == "admin" ? (
        <p onClick={getHistory} className={"historyLink"}>
          VIEW HISTORY
        </p>
      ) : (
        ""
      )}

      <p onClick={exit} className={"exitLink"}>
        EXIT
      </p>
    </div>
  );
};

export default NavBar;
