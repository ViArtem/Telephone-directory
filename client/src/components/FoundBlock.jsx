import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import MyButton from "./UI/button/MyButton";
import Photo from "./UI/photo/Photo";
import axios from "axios";
import avatarImage from "../components/icon/avatar3.jpg";
const FoundBlock = ({
  styleClass,
  foundContactHttp,
  editModal,
  editModalValue,
  deletes,
  socket,
  setupdatingList,
}) => {
  let className = "otherBlock foundContactBlock";
  const [userData, setUserData] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [deleteUser, setDeleteUser] = useState("");
  const [httpImg, setHttpImg] = useState("");
  const [noAvatar, setNoAvatar] = useState(false);
  const [noSocketAvatar, setNoSocketAvatar] = useState(false);
  if (styleClass) {
    className += styleClass;
  }

  useEffect(() => {
    if (foundContactHttp) {
      try {
        setDeleteUser({
          fullName: foundContactHttp.data.fullName,
          action: "Delete",
          imgPath: foundContactHttp.data.avatar,
          userId: jwt(localStorage.getItem("Authorization")).id,
          userRole: jwt(localStorage.getItem("Authorization")).role,
        });
        if (foundContactHttp.data.number) {
          if (
            jwt(localStorage.getItem("Authorization")).id ===
              foundContactHttp.data.owner ||
            jwt(localStorage.getItem("Authorization")).role === "admin"
          ) {
            setNoAvatar(false);
            if (foundContactHttp.data.avatar === "noAvatar") {
              setNoAvatar(true);
            }
            setHttpImg(foundContactHttp.data.avatar);
            setShowButton(true);
          } else {
            setShowButton(false);
          }

          setUserNumber(foundContactHttp.data.number);
          setNoAvatar(false);
          if (foundContactHttp.data.avatar === "noAvatar") {
            setNoAvatar(true);
          }
          setHttpImg(foundContactHttp.data.avatar);
          return setUserData(foundContactHttp.data.fullName);
        }
      } catch (error) {
        if (foundContactHttp.success === "The value cannot be empty") {
          setShowButton(false);
          setUserNumber(false);
          return setUserData("The value cannot be empty");
        }

        if (foundContactHttp.success === "Contact no found") {
          setUserNumber(false);
          setHttpImg(false);
          setShowButton(false);
          return setUserData("No found");
        }
      }
    }
  }, [foundContactHttp]);

  const [deleteUserDataSocket, setdeleteUserDataSocket] = useState("");
  // information about the found user
  const [foundUserDataSocket, setfoundUserDataSocket] = useState("");
  const [foundUserNumberSocket, setfoundUserNumberSocket] = useState("");

  const [allUserSocketData, setAllUserSocketData] = useState("");
  const [showSocketButton, setShowSocketButton] = useState(false);
  const [socketImg, setSocketImg] = useState("");

  async function ButtonDelete(e) {
    try {
      e.preventDefault();
      if (socket) {
        socket.emit("delete user value", {
          fullName: deleteUserDataSocket,
          ownerName: jwt(localStorage.getItem("Authorization")).username,
          ownerId: jwt(localStorage.getItem("Authorization")).id,
          userRole: jwt(localStorage.getItem("Authorization")).role,
          imagePath: socketImg,
        });
        setNoSocketAvatar(false);
        // updates the list of users at the click of a button
        setfoundUserDataSocket("");
        setfoundUserNumberSocket("");
        setShowSocketButton(false);
      } else {
        setNoAvatar(false);
        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}contact/delete`,
          {
            data: deleteUser,
          }
        );
        foundContactHttp = null;
        setUserNumber("");
        deletes(response);
        setShowButton(false);
        setUserData("");
        setupdatingList(Math.random());
      }
    } catch (error) {
      console.log(error);
    }
  }

  function ButtonEdit() {
    // socket edit modal
    if (socket && editModal) {
      editModal(true);
      setNoSocketAvatar(false);
      setShowSocketButton(false);
      setfoundUserDataSocket("");
      setfoundUserNumberSocket("");
      setupdatingList(Math.random() + Math.random());
      return editModalValue({
        fullName: allUserSocketData.fullName,
        number: allUserSocketData.number,
        id: allUserSocketData._id,
        socket: true,
      });
    }
    //http edit modal
    if ((editModal && foundContactHttp) || editModalValue) {
      editModal(true);
      setNoAvatar(false);
      foundContactHttp.data.avatar = "";
      setShowButton(false);
      setUserData("");
      setUserNumber("");
      editModalValue({
        fullName: foundContactHttp.data.fullName,
        number: foundContactHttp.data.number,
        id: foundContactHttp.data._id,
      });
      setupdatingList(Math.random());
    }
  }

  //socket
  // display of the found user
  if (socket) {
    socket.on("findOne user", (data) => {
      if (
        data.userFirstName == "User not found" ||
        data.userFirstName == "The value cannot be empty"
      ) {
        setfoundUserNumberSocket("");
        setfoundUserDataSocket(data.userFirstName);
        setShowSocketButton(false);
      } else {
        setNoSocketAvatar(false);
        if (data.foundData.avatar === "noAvatar") {
          setNoSocketAvatar(true);
        }
        setSocketImg(data.foundData.avatar);
        setfoundUserDataSocket(`${data.foundData.fullName}`);
        setfoundUserNumberSocket(`${data.foundData.number}`);
        //
        setdeleteUserDataSocket(`${data.foundData.fullName}`);
        setAllUserSocketData(data.foundData);
        //
        if (
          jwt(localStorage.getItem("Authorization")).id ==
            data.foundData.owner ||
          jwt(localStorage.getItem("Authorization")).role == "admin"
        ) {
          setShowSocketButton(true);
        } else setShowSocketButton(false);
      }
    });
  }

  return (
    <div className={className}>
      <h1>FOUND CONTACT</h1>
      <div className="container">
        {foundUserNumberSocket ? (
          <Photo
            style={{
              width: "80px",
              height: "80px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <img
              src={
                noSocketAvatar
                  ? avatarImage
                  : `${process.env.REACT_APP_SERVER_URL}${socketImg}`
              }
              alt="Foto"
            />
          </Photo>
        ) : (
          ""
        )}

        {foundUserDataSocket ? (
          <div>
            <p style={{ fontSize: "18px" }}>{foundUserDataSocket}</p>
            <p>{foundUserNumberSocket}</p>
          </div>
        ) : (
          ""
        )}

        {userNumber ? (
          <Photo
            style={{
              width: "80px",
              height: "80px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <img
              src={
                noAvatar
                  ? avatarImage
                  : `${process.env.REACT_APP_SERVER_URL}${httpImg}`
              }
              alt="Foto"
            />
          </Photo>
        ) : (
          " "
        )}

        {foundContactHttp ? (
          <div>
            <p style={{ fontSize: "18px" }}>{userData}</p>
            <p>{userNumber}</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {showButton ? <MyButton onClick={ButtonEdit}>Edit</MyButton> : ""}

        {showButton ? (
          <MyButton
            onClick={ButtonDelete}
            style={{
              marginLeft: "20px",
              border: " 1px solid rgb(255, 150, 200)",
            }}
          >
            Delete
          </MyButton>
        ) : (
          ""
        )}
      </div>

      <div>
        {showSocketButton ? <MyButton onClick={ButtonEdit}>Edit</MyButton> : ""}

        {showSocketButton ? (
          <MyButton
            onClick={ButtonDelete}
            style={{
              marginLeft: "20px",
              border: " 1px solid rgb(255, 150, 200)",
            }}
          >
            Delete
          </MyButton>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FoundBlock;
