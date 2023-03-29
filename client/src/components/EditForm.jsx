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
  const editContact = (e) => {
    /// The function sends a request with form data to edit a contact
    e.preventDefault();
    if (userValue.socket) {
      const reader = new FileReader();
      if (img) {
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
        setImg("");
        editModal(false);
      } else {
        setHasImg(false);
      }
    } else {
      if (img) {
        const data = new FormData();
        data.append("fullName", contact.fullName);
        data.append("number", contact.number);
        data.append("id", contact.id);
        data.append("owner", contact.owner);
        data.append("userRole", contact.userRole);
        data.append("action", contact.action);
        data.append("avatar", img);

        axios
          .put("http://localhost:4000/contact/update", data)
          .then((user) => {
            edit(user);

            editModal(false);
            setupdatingList(Math.random());
            setImg("");
            return setContact({ ...contact, number: "", fullName: "" });
          })
          .catch((e) => {
            if (e.response.data.message === "The value cannot be empty") {
              return edit(e.response.data);
            }
            if (e.response.status === 403) {
              return edit(e.response.data);
            }
            console.log(e);
          });
      } else {
        setHasImg(false);
      }
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
          marginBottom: "20px",
          display: "inline-block",
          fontSize: "22px",
          width: "100%",
        }}
      >
        Edit Contact
      </h1>
      {!hasImg ? <p style={{ color: "red" }}>please upload an avatar</p> : ""}
      <form style={{ width: "100%", marginTop: "5px" }}>
        <label for="">Enter full name</label>
        <MyInput
          style={{ marginTop: "7px", marginBottom: "7px" }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          placeholder="Full name"
        />
        <label for="">Enter number</label>
        <MyInput
          style={{ marginTop: "7px", marginBottom: "7px" }}
          value={contact.number}
          onChange={(e) => setContact({ ...contact, number: e.target.value })}
          type="text"
          maxLength={13}
          minLength={12}
          placeholder="+380685452894"
        />
        <label for="">Add avatar</label>
        <input
          style={{ marginTop: "5px", marginBottom: "7px" }}
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <MyButton onClick={editContact}>Update</MyButton>
      </form>
    </div>
  );
};

export default EditForm;
