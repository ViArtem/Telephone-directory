import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import jwt from "jwt-decode";

//require("dotenv").config();

const AddContactBlock = ({ styleClass, add, socket, setupdatingList }) => {
  let className = "otherBlock addBlock";

  if (styleClass) {
    className += styleClass;
  }

  const [imageError, setImageError] = useState(null);
  const [image, setImage] = useState(null);
  const [socketImage, setSocketImage] = useState(null);
  const [imageValue, setImageValue] = useState("click to add an avatar");
  const [socketImageValue, setSocketImageValue] = useState(
    "click to add an avatar"
  );

  // The variable receives data from forms for adding a contact
  const [contact, setContact] = useState({
    fullName: "",
    number: "",
    owner: jwt(localStorage.getItem("Authorization")).id,
    action: "Add",
    avatar: "",
  });
  /// The function sends a request with form data to add a contact

  const addContact = async (e) => {
    e.preventDefault();

    const data = new FormData();

    //for the socket block

    if (socket) {
      if (!socketImage) {
        return setImageError("Please add an avatar");
      }
      const reader = new FileReader();
      reader.readAsDataURL(socketImage);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];

        socket.emit("send user value", {
          fullName: contact.fullName,
          number: contact.number,
          ownerId: contact.owner,
          avatar: base64Image,
        });
      };
      setSocketImage(null);
      setSocketImageValue("click to upload");
      setContact({ ...contact, number: "", fullName: "" });
      setImageError(null);
    } else {
      if (!image) {
        return setImageError("Please add an avatar");
      }
      data.append("fullName", contact.fullName);
      data.append("number", contact.number);
      data.append("owner", contact.owner);
      data.append("action", contact.action);
      data.append("avatar", image);
      //for the http block
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}contact/add`, data) //
        .then((user) => {
          if (user.data) {
            add(user);
            setImage(null);
            setContact({ ...contact, number: "", fullName: "" });
            setImageValue("click to upload");
            return setupdatingList(Math.random());
          }
          if (user.response.data.message) {
            return add({ success: user.response.data.message });
          }
          setImageError(null);
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data.message == "The value cannot be empty") {
            return add({ success: e.response.data.message });
          }

          if (
            e.response.data.message == "Name not valid" ||
            "Number not valid"
          ) {
            return add({ success: e.response.data.message });
          }

          if (e.response.status == 415) {
            return add({ success: e.response.data.message });
          }
        });
    }
    //photo
  };

  return (
    <div className={className}>
      <h1>ADD CONTACT</h1>
      <p style={{ color: "red" }}>{imageError}</p>
      <form
        className="addForm"
        style={{ width: "100%" }}
        enctype="multipart/form-data"
      >
        <label for=""></label>
        <MyInput
          style={{ marginTop: "50px", marginBottom: "7px" }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          minLength={1}
          placeholder="Full name"
        />
        <label for=""></label>
        <MyInput
          style={{ marginTop: "5px", marginBottom: "5px" }}
          value={contact.number}
          onChange={(e) => setContact({ ...contact, number: e.target.value })}
          type="text"
          maxLength={13}
          minLength={12}
          placeholder="Number: +380..."
        />
        {socket ? (
          <div style={{ position: "relative", lineHeight: "25px" }}>
            <input
              className="fileInput"
              id="imageInputS"
              type="file"
              onChange={(e) => {
                setSocketImage(e.target.files[0]);
                setSocketImageValue("uploaded");
              }}
            />
            <span className="fileInputSpan">
              <label for="imageInputS">{socketImageValue}</label>
            </span>
          </div>
        ) : (
          ""
        )}
        {!socket ? (
          <div style={{ position: "relative", lineHeight: "25px" }}>
            <input
              id="imageInput"
              className="fileInput"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageValue("uploaded");
              }}
            />
            <span className="fileInputSpan">
              <label for="imageInput">{imageValue}</label>
            </span>
          </div>
        ) : (
          ""
        )}
        <MyButton
          style={{ marginTop: "30px", marginLeft: "auto", marginRight: "auto" }}
          onClick={addContact}
        >
          Add
        </MyButton>
      </form>
    </div>
  );
};

export default AddContactBlock;
