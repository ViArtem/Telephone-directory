import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import jwt from "jwt-decode";
import Photo from "./UI/photo/Photo";
import avatarImage from "../components/icon/avatar3.jpg";
import MyInputNumber from "./UI/inputNumber/MyInputNumber";

const AddContactBlock = ({ styleClass, add, socket, setupdatingList }) => {
  let className = "otherBlock addBlock";

  if (styleClass) {
    className += styleClass;
  }

  const [image, setImage] = useState(avatarImage);
  const [filePath, setFilePath] = useState(avatarImage);
  const [socketImage, setSocketImage] = useState("noAvatar");
  const [imageValue, setImageValue] = useState("Change avatar");
  const [socketImageValue, setSocketImageValue] = useState("Change avatar");

  const [errorMessage, setErrorMessage] = useState("");
  // The variable receives data from forms for adding a contact
  const [contact, setContact] = useState({
    fullName: "",
    number: "",
    owner: jwt(localStorage.getItem("Authorization")).id,
    action: "Add",
    avatar: "",
  });

  const [activeButton, setActiveButton] = useState("");
  const [activeNumberField, setActiveNumberField] = useState("");
  const [activeNameField, setActiveNameField] = useState("");
  useEffect(() => {
    if (contact.fullName.length >= 3 || contact.number.length > 12) {
      setActiveButton("");
      if (!/^[a-z]+ [a-z]+$/.test(contact.fullName)) {
        setActiveNameField("incorrectValue");
        return;
      }
      setActiveNameField("");

      if (
        !/^(?:\+[1-9]{1,3})?(?:[0-9]{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/.test(
          contact.number
        )
      ) {
        setActiveNumberField("incorrectValue");
        return;
      }
      setActiveNumberField("");
      setActiveButton("myBtnActive");
      return;
    }

    setActiveButton("");
  }, [contact]);
  /// The function sends a request with form data to add a contact

  const addContact = async (e) => {
    e.preventDefault();

    if (!contact.fullName) {
      setActiveNameField("incorrectValue");
      setTimeout(() => {
        setActiveNameField("");
      }, 800);
      return;
    }

    if (!contact.number) {
      setActiveNumberField("incorrectValue");
      setTimeout(() => {
        setActiveNumberField("");
      }, 800);
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
            fullName: contact.fullName,
            number: contact.number,
            ownerId: contact.owner,
            avatar: base64Image,
          });
        };
      }
      if (socketImage === "noAvatar") {
        socket.emit("send user value", {
          fullName: contact.fullName,
          number: contact.number,
          ownerId: contact.owner,
          avatar: socketImage,
        });
      }
      setSocketImage("noAvatar");
      setFilePath(avatarImage);
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
        .post(`${process.env.REACT_APP_SERVER_URL}contact/add`, data) //
        .then((user) => {
          if (user.data) {
            add(user);
            setImage(null);
            setContact({ ...contact, number: "", fullName: "" });
            setImageValue("click to upload");
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
        <label for=""></label>
        <MyInput
          className={activeNameField}
          style={{ marginTop: "35px", marginBottom: "0px" }}
          value={contact.fullName}
          onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
          type="text"
          minLength={1}
          placeholder="Full name"
        />
        <label for=""></label>
        <MyInput
          className={activeNumberField}
          value={contact.number}
          onChange={(e) => setContact({ ...contact, number: e.target.value })}
          type="tel"
          maxLength={13}
          minLength={12}
          placeholder="Number: +380..."
        />
        {/* <MyInputNumber
          // className={activeNumberField}
          name={"number"}
          required={true}
          autoFocus={true}
          placeholder={""}
          className={"myInput"}
          country="ua"
          value={contact.number}
          onChange={(number) => setContact({ ...contact, number })}
        /> */}

        <div style={{ display: "flex", gap: "10px" }}>
          <Photo style={{ width: "15px", height: "55px" }}>
            <img src={filePath} alt="Foto" />
          </Photo>

          {socket ? (
            <div
              style={{
                position: "relative",
                lineHeight: "25px",
                marginTop: "10px",
              }}
            >
              <input
                className="fileInput"
                id="imageInputS"
                type="file"
                onChange={(e) => {
                  setSocketImage(e.target.files[0]);

                  setSocketImageValue("uploaded");
                  setFilePath(URL.createObjectURL(e.target.files[0]));
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
            <div
              style={{
                position: "relative",
                lineHeight: "25px",
                marginTop: "10px",
              }}
            >
              <input
                id="imageInput"
                className="fileInput"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageValue("uploaded");
                  setFilePath(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <span className="fileInputSpan">
                <label for="imageInput">{imageValue}</label>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        <MyButton
          style={{
            marginBottom: "10px",
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
