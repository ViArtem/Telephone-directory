import React, { useState, useEffect } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import jwt from "jwt-decode";
const FindBlock = ({
  styleClass,
  find,
  socket,
  setUpdatingList,
  sendFilteredUsers,
}) => {
  let className = "otherBlock findBlock";

  if (styleClass) {
    className += styleClass;
  }

  const [contact, setContact] = useState({ fullName: "", action: "Find" });
  const [activeButton, setActiveButton] = useState("");
  const [activeNameField, setActiveNameField] = useState("");

  // фільтр по частині значень
  const [contactFilter, setContactFilter] = useState("");
  useEffect(() => {
    if (socket) {
      if (contactFilter.trim() === "" || contactFilter.length < 2) {
        return setUpdatingList(Math.random());
      }

      socket.emit("filter", { fullName: contactFilter });
      socket.on("filter data", (data) => {
        if (data.filterUserList.length > 5) {
          data.filterUserList.splice(5);
        }
        sendFilteredUsers([...data.filterUserList]);
      });
    }
  }, [contactFilter]);
  //

  useEffect(() => {
    if (contact.fullName.length >= 3) {
      setActiveNameField("");
      setActiveButton("myBtnActive");
      return;
    }

    setActiveButton("");
    return;
  }, [contact]);

  const findContact = (e) => {
    e.preventDefault();
    if (contact.fullName.length <= 3) {
      setActiveNameField("incorrectValue");
      setTimeout(() => {
        setActiveNameField("");
      }, 800);
      return;
    }

    //
    if (socket) {
      socket.emit(
        "find user value",
        {
          fullName: contact.fullName,
          ownerName: jwt(localStorage.getItem("Authorization")).username,
        },
        jwt(localStorage.getItem("Authorization")).id
      );

      setContact({ ...contact, fullName: "" });
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}contact/find`, contact)
        .then((user) => {
          const hasUser = user.data;

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
    <div className={className}>
      <h1>FIND CONTACT</h1>

      <form style={{ width: "100%" }}>
        <label for=""></label>
        <MyInput
          className={activeNameField}
          style={{ marginTop: "55px" }}
          value={contact.fullName}
          onChange={(e) => {
            setContactFilter(e.target.value);
            setContact({ ...contact, fullName: e.target.value });
          }}
          type="text"
          minLength={1}
          placeholder="Contact name or number"
          required
        />

        <MyButton
          className={activeButton}
          style={{ marginTop: "45px" }}
          onClick={findContact}
        >
          Find
        </MyButton>
      </form>
    </div>
  );
};

export default FindBlock;
