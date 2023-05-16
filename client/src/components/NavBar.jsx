import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import "../styles/App.css";
import Photo from "./UI/photo/Photo";
import avatarImage from "../components/icon/avatar1.png";

const NavBar = ({
  styleClass,
  history,
  historyList,
  socketConnection,
  changeListVisible,
  cangeAboutVisible,
  newMessageValue,
  avatarChange,
  changeAvatarVisibleFunc,
  changeAvatarVisible,
}) => {
  const [arrowClass, setArrowClass] = useState("arrow up");

  const [jwtAvatarImage, setJwtAvatarImage] = useState(
    jwt(localStorage.getItem("Authorization")).avatar
  );

  useEffect(() => {
    setJwtAvatarImage(jwt(localStorage.getItem("Authorization")).avatar);
  }, [avatarChange]);

  //const jwtAvatarImage = ;
  let className = "navBar ";
  let userRole;
  let userName;
  if (localStorage.getItem("Authorization")) {
    if (jwt(localStorage.getItem("Authorization"))) {
      userRole = jwt(localStorage.getItem("Authorization")).role;
      userName = jwt(localStorage.getItem("Authorization")).username;
    }
  }

  const [classNameSupport, setClassNameSupport] = useState("historyLink");

  if (styleClass) {
    setClassNameSupport((classNameSupport += styleClass.styleClass));
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
  //

  function authorInfo() {
    cangeAboutVisible(true);
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
      <div className="headerUserContent" style={{ display: "flex" }}>
        <Photo>
          <img
            src={
              jwtAvatarImage != "noAvatar"
                ? `${process.env.REACT_APP_SERVER_URL}${jwtAvatarImage}`
                : avatarImage
            }
            alt="Avatar"
          />
        </Photo>

        <p>
          {userName} ({userRole})
        </p>
        <p
          onClick={() => {
            if (changeAvatarVisible) {
              changeAvatarVisibleFunc(false);
              return setArrowClass("up arrow");
            }
            changeAvatarVisibleFunc(true);
            setArrowClass("down arrow");
          }}
          className="changeAvatarTriangle"
        >
          <i class={arrowClass}></i>
        </p>
      </div>
      <div className="navbarLinks">
        {jwt(localStorage.getItem("Authorization")).role === "admin" ? (
          <p onClick={getChats} className={classNameSupport}>
            SUPPORT
          </p>
        ) : (
          ""
        )}
        {jwt(localStorage.getItem("Authorization")).role == "admin" ? (
          <p onClick={getHistory} className="historyLink">
            VIEW HISTORY
          </p>
        ) : (
          ""
        )}
        <p onClick={authorInfo} className={"historyLink"}>
          ABOUT
        </p>
        <p onClick={exit} className={"exitLink"}>
          EXIT
        </p>
      </div>
    </div>
  );
};

export default NavBar;
