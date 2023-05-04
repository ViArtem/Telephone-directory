import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import jwt from "jwt-decode";
import axios from "axios";
const EditForm = ({ userValue, edit, editModal, socket, setupdatingList }) => {
  const [hasImg, setHasImg] = useState(true);
  const [contact, setContact] = useState({
    fullName: "",
    number: "",
    id: "",
    action: "Edit",
    owner: jwt(localStorage.getItem("Authorization")).id,
    userRole: jwt(localStorage.getItem("Authorization")).role,
  });
  const [img, setImg] = useState(null);
  const [imgValue, setImgValue] = useState("click to upload");

  const [errorMessage, setErrorMessage] = useState("");
  const editContact = (e) => {
    /// The function sends a request with form data to edit a contact
    e.preventDefault();
    if (userValue.socket) {
      const reader = new FileReader();

      reader.readAsDataURL(img);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];

        socket.emit("edit user value", {
          newFullName: contact.fullName,
          newNumber: contact.number,
          idForUpdate: userValue.id,
          owner: contact.owner,
          userRole: contact.userRole,
          avatar: base64Image,
        });
      };
      setImg(null);
      setImgValue("click to upload");
      editModal(false);
    } else {
      const data = new FormData();
      data.append("fullName", contact.fullName);
      data.append("number", contact.number);
      data.append("id", contact.id);
      data.append("owner", contact.owner);
      data.append("userRole", contact.userRole);
      data.append("action", contact.action);
      data.append("avatar", img);

      axios
        .put(`${process.env.REACT_APP_SERVER_URL}contact/update`, data)
        .then((user) => {
          // if (user.response.data.message.message) {
          //   return setErrorMessage(user.response.data.message.message);
          // }
          edit(user);
          editModal(false);
          setupdatingList(Math.random());
          setImg(null);
          setImgValue("click to upload");

          return setContact({ ...contact, number: "", fullName: "" });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (userValue) {
      setContact({
        ...contact,
        number: userValue.number,
        fullName: userValue.fullName,
        id: userValue.id,
      });
    }
  }, [userValue]);

  return (
    <div className="editBlock">
      <h1
        style={{
          color: "rgba(39, 38, 67, 1)",
          marginBottom: "20px",
          display: "inline-block",
          fontSize: "24px",
          width: "100%",
        }}
      >
        Edit Contact
      </h1>
      <p>{errorMessage}</p>
      {!hasImg ? <p style={{ color: "red" }}>please upload an avatar</p> : ""}
      <form style={{ width: "100%", marginTop: "5px" }}>
        <label for=""></label>
        <MyInput
          style={{ marginTop: "20px", marginBottom: "20px" }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          placeholder="Full name"
        />
        <label for=""></label>
        <MyInput
          style={{ marginTop: "20px", marginBottom: "20px" }}
          value={contact.number}
          onChange={(e) => setContact({ ...contact, number: e.target.value })}
          type="text"
          maxLength={13}
          minLength={12}
          placeholder="+380685452894"
        />
        <div style={{ position: "relative", lineHeight: "25px" }}>
          <input
            className="fileInput"
            id="imageInputEdit"
            type="file"
            onChange={(e) => {
              setImg(e.target.files[0]);
              setImgValue("uploaded");
            }}
          />
          <span className="fileInputSpan">
            <label for="imageInputEdit">{imgValue}</label>
          </span>
        </div>
        <MyButton onClick={editContact} style={{ marginTop: "10px" }}>
          Update
        </MyButton>
      </form>
    </div>
  );
};

export default EditForm;
