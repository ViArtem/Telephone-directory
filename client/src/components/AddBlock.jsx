import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import jwt from "jwt-decode";
import Photo from "./UI/photo/Photo";
import avatarImage from "../components/icon/avatarText.jpg";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const AddContactBlock = ({ styleClass, add, socket, setupdatingList }) => {
  let className = "otherBlock addBlock";

  if (styleClass) {
    className += styleClass;
  }

  const [image, setImage] = useState(avatarImage);
  const [filePath, setFilePath] = useState(avatarImage);

  const [socketImage, setSocketImage] = useState("noAvatar");

  const [errorMessage, setErrorMessage] = useState("");
  // The variable receives data from forms for adding a contact
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    number: "",
    owner: jwt(localStorage.getItem("Authorization")).id,
    action: "Add",
    avatar: "",
  });

  const handlePhoneInputChange = (value) => {
    if (value === undefined) {
      return setContact({ ...contact });
    }
    setContact({ ...contact, number: value });
  };

  const [activeButton, setActiveButton] = useState("");

  const [canSend, setCanSend] = useState(false);
  const [activeNumberField, setActiveNumberField] = useState("");
  const [activeNameField, setActiveNameField] = useState("");
  const [activeLastNameField, setActiveLastNameField] = useState("");

  useEffect(() => {
    if (
      contact.firstName.length >= 2 ||
      contact.lastName.length >= 2 ||
      contact.number.length > 12
    ) {
      setActiveButton("");

      // highlights the field with the first name in red
      if (!/^[a-zA-Z]+$/.test(contact.firstName)) {
        setActiveNameField("incorrectValue");
        setCanSend(false);
        return;
      }
      setActiveNameField("");

      // highlights the field with the last name in red
      if (!/^[a-zA-Z]+$/.test(contact.lastName)) {
        setActiveLastNameField("incorrectValue");
        setCanSend(false);
        return;
      }
      setActiveLastNameField("");

      // highlights the field with the number in red
      if (
        !/^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/.test(
          contact.number
        )
      ) {
        setActiveNumberField("PhoneInputInputIncorrect");
        setCanSend(false);
        return;
      }
      setActiveNumberField("");
      setCanSend(true);
      setActiveButton("myBtnActive");
      return;
    }

    setActiveButton("");
  }, [contact]);
  /// The function sends a request with form data to add a contact

  const addContact = async (e) => {
    e.preventDefault();
    if (!canSend) {
      setActiveButton("myBtnIncorrect");
      setTimeout(() => {
        setActiveButton("");
      }, 600);

      return;
    }

    const data = new FormData();

    //for the socket block

    if (socket) {
      const reader = new FileReader();
      if (socketImage !== "noAvatar") {
        reader.readAsDataURL(socketImage);
        reader.onload = () => {
          const base64Image = reader.result.split(",")[1];

          socket.emit("send user value", {
            fullName: `${contact.firstName} ${contact.lastName}`,
            number: contact.number,
            ownerId: contact.owner,
            ownerName: jwt(localStorage.getItem("Authorization")).username,
            avatar: base64Image,
          });
        };
      }

      if (socketImage === "noAvatar") {
        socket.emit("send user value", {
          fullName: `${contact.firstName} ${contact.lastName}`,
          number: contact.number,
          ownerName: jwt(localStorage.getItem("Authorization")).username,
          ownerId: contact.owner,
          avatar: socketImage,
        });
      }
      setSocketImage("noAvatar");
      setFilePath(avatarImage);

      setContact({ ...contact, number: "", firstName: "", lastName: "" });
    } else {
      data.append("fullName", `${contact.firstName} ${contact.lastName}`);
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
            setContact({ ...contact, number: "", firstName: "", lastName: "" });
            setErrorMessage("");
            setFilePath(avatarImage);
            return setupdatingList(Math.random());
          }

          if (user.response.data.message) {
            return setErrorMessage(user.response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    //photo
  };

  return (
    <div className={className}>
      <h1>ADD CONTACT</h1>
      <p>{errorMessage}</p>
      <form
        className="addForm"
        style={{ width: "100%" }}
        enctype="multipart/form-data"
      >
        <div className="avatarFullNameContainer">
          {socket ? (
            <div>
              <input
                className="fileInput"
                id="imageInputS"
                type="file"
                onChange={(e) => {
                  setSocketImage(e.target.files[0]);
                  if (e.target.files[0]) {
                    setFilePath(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />

              <span>
                <label className="imageInput" for="imageInputS">
                  <Photo>
                    <img src={filePath} alt="Foto" />
                  </Photo>
                </label>
              </span>
            </div>
          ) : (
            ""
          )}

          {!socket ? (
            <div>
              <input
                className="fileInput"
                id="imageInput"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  if (e.target.files[0]) {
                    setFilePath(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />

              <span>
                <label className="imageInput" for="imageInput">
                  <Photo>
                    <img src={filePath} alt="Foto" />
                  </Photo>
                </label>
              </span>
            </div>
          ) : (
            ""
          )}

          <div className="fullNameInputs">
            <label for=""></label>
            <MyInput
              className={activeNameField}
              value={contact.firstName}
              onChange={(e) =>
                setContact({ ...contact, firstName: e.target.value })
              }
              type="text"
              minLength={1}
              placeholder="First name"
            />
            <MyInput
              className={activeLastNameField}
              value={contact.lastName}
              onChange={(e) =>
                setContact({ ...contact, lastName: e.target.value })
              }
              type="text"
              minLength={1}
              placeholder="Last name"
            />
          </div>
        </div>
        {/*  */}
        <PhoneInput
          country="UA"
          style={{ marginTop: "10px" }}
          class={`PhoneInputInput ${activeNumberField}`}
          value={contact.number}
          onChange={handlePhoneInputChange}
          maxLength={16}
          minLength={12}
          placeholder="Telephone"
        />
        <MyButton
          style={{
            marginTop: "12px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className={activeButton}
          onClick={addContact}
        >
          Add
        </MyButton>
      </form>
    </div>
  );
};

export default AddContactBlock;
