import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import jwt from "jwt-decode";

const AddContactBlock = ({ styleClass, add, socket, setupdatingList }) => {
  let className = "otherBlock ";

  if (styleClass) {
    className += styleClass;
  }

  //const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const [imageValue, setImageValue] = useState("click to upload");
  const [socketImageValue, setSocketImageValue] = useState("click to upload");

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
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];

        socket.emit("send user value", {
          fullName: contact.fullName,
          number: contact.number,
          ownerId: contact.owner,
          avatar: base64Image,
        });
      };
      setImage("");
      setSocketImageValue("click to upload");
      setContact({ ...contact, number: "", fullName: "" });
    } else {
      data.append("fullName", contact.fullName);
      data.append("number", contact.number);
      data.append("owner", contact.owner);
      data.append("action", contact.action);
      data.append("avatar", image);
      //for the http block
      axios
        .post("http://localhost:4000/contact/add", data)
        .then((user) => {
          if (user.data) {
            add(user);
            setImage("");
            setContact({ ...contact, number: "", fullName: "" });
            setImageValue("click to upload");
            return setupdatingList(Math.random());
          }
          if (user.response.data.message) {
            return add({ success: user.response.data.message });
          }
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
      <h1
        style={{
          marginBottom: "10px",
          display: "inline-block",
          fontSize: "22px",
          width: "100%",
        }}
      >
        ADD CONTACT
      </h1>

      <form style={{ width: "100%" }} enctype="multipart/form-data">
        <label for="">Enter full name</label>
        <MyInput
          style={{ marginTop: "5px", marginBottom: "7px" }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          minLength={1}
          placeholder="Full name"
        />
        <label for="">Enter number</label>
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
            <p> Add avatar</p>
            <input
              id="imageInputS"
              style={{
                marginTop: "5px",
                marginBottom: "7px",
                position: "absolute",
                visibility: "hidden",
                opacity: "0",
              }}
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setSocketImageValue("uploaded");
              }}
            />
            <span
              style={{
                border: " 1px solid rgb(255, 255, 250)",
                backgroundColor: "rgba(95, 94, 195, 0.5)",
                padding: "2px 10px",
                borderRadius: "4px",
              }}
            >
              <label for="imageInputS">{socketImageValue}</label>
            </span>
          </div>
        ) : (
          ""
        )}
        {!socket ? (
          <div style={{ position: "relative", lineHeight: "25px" }}>
            <p> Add avatar</p>
            <input
              id="imageInput"
              style={{
                marginTop: "5px",
                marginBottom: "7px",
                position: "absolute",
                visibility: "hidden",
                opacity: "0",
              }}
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageValue("uploaded");
              }}
            />
            <span
              style={{
                border: " 1px solid rgb(255, 255, 250)",
                backgroundColor: "rgba(95, 94, 195, 0.5)",
                padding: "2px 10px",
                borderRadius: "4px",
              }}
            >
              <label for="imageInput">{imageValue}</label>
            </span>
          </div>
        ) : (
          ""
        )}
        <MyButton style={{ marginTop: "7px" }} onClick={addContact}>
          Add
        </MyButton>
      </form>
    </div>
  );
};

export default AddContactBlock;
