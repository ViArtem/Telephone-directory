import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import MyButton from "./UI/button/MyButton";
import Photo from "./UI/photo/Photo";
import axios from "axios";
const ChangeAvatar = ({ avatarChange, changeAvatarVisibleFunc }) => {
  const [imageValue, setImageValue] = useState("Сlick to change avatar");

  const [image, setImage] = useState(
    jwt(localStorage.getItem("Authorization")).avatar
  );
  async function changeAvatar(e) {
    e.preventDefault();
    const newAvatar = new FormData();
    newAvatar.append("avatar", image);

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}user/change/avatar`,
      newAvatar
    );

    setImageValue("Upload avatar");
    setImage(jwt(localStorage.getItem("Authorization")).avatar);

    avatarChange(Math.random());
    changeAvatarVisibleFunc(false);
  }

  return (
    <div className="changeAvatar">
      <div className="changeContent">
        <div className="fotoContent">
          <Photo style={{ marginLeft: " auto", marginRight: "auto" }}>
            <img
              src={
                image !== jwt(localStorage.getItem("Authorization")).avatar
                  ? URL.createObjectURL(image)
                  : `${process.env.REACT_APP_SERVER_URL}${image}`
              }
              alt=""
            />
          </Photo>

          <div
            style={{
              width: "180px",
              marginTop: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <input
              className="fileInputChangeAvatar"
              id="imageInputS"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageValue("uploaded");
              }}
            />
            <span className="fileInputSpanChangeAvatar">
              <label for="imageInputS">{imageValue}</label>
            </span>
          </div>
        </div>
        <div
          style={{
            width: "100px",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <MyButton onClick={changeAvatar}>Change</MyButton>
        </div>
      </div>
    </div>
  );
};
export default ChangeAvatar;
