import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import jwt from "jwt-decode";
const FindBlock = ({ styleClass, find, socket }) => {
  let className = "otherBlock ";

  if (styleClass) {
    className += styleClass;
  }

  const [contact, setContact] = useState({ fullName: "", action: "Find" });

  const findContact = (e) => {
    e.preventDefault();

    if (socket) {
      socket.emit(
        "find user value",
        {
          fullName: contact.fullName,
        },
        jwt(localStorage.getItem("Authorization")).id
      );

      setContact({ ...contact, fullName: "" });
    } else {
      axios
        .post("http://localhost:4000/contact/find", contact)
        .then((user) => {
          console.log(user);
          const hasUser = user.data;
          console.log(hasUser);
          if (hasUser) {
            return find(user);
          }

          if (!hasUser) {
            return find({ success: user.response.data.message });
          }

          setContact({ ...contact, fullName: "" });
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data.message) {
            return find({ success: e.response.data.message });
          }
          if (e.response.data.number) {
            return find(e.data);
          }
          console.log("Error " + e);
        });

      setContact({ ...contact, fullName: "" });
    }
  };

  return (
    <div style={{ height: "232px" }} className={className}>
      <h1
        style={{
          marginBottom: "20px",
          display: "inline-block",
          fontSize: "22px",
          width: "100%",
          fontFamily: "'Inter', sans-serif ",
        }}
      >
        FIND NUMBER
      </h1>

      <form style={{ width: "100%" }}>
        <label for="">Enter full name</label>

        <MyInput
          style={{ marginTop: "10px", marginBottom: "10px" }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          minLength={1}
          placeholder="Contact name"
          required
        />

        <MyButton onClick={findContact}>Find</MyButton>
      </form>
    </div>
  );
};

export default FindBlock;
