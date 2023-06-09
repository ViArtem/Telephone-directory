import React, { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";
import { Link } from "react-router-dom";
import avatarImage from "../components/icon/avatar.svg";
import "../styles/Auth.css";

const Registration = () => {
  const [image, setImageRegist] = useState(avatarImage);
  const [imageValue, setImageValueRegist] = useState(
    "click to upload an avatar"
  );

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorValue, setErrorValue] = useState("");

  async function registrationUser(e) {
    try {
      e.preventDefault();

      const data = new FormData();
      data.append("firstName", newUser.firstName);
      data.append("lastName", newUser.lastName);
      data.append("email", newUser.email);
      data.append("password", newUser.password);
      data.append("avatar", image);
      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}user/registration`, data)
        .then((response) => {
          if (response.response.status === 400) {
            return setErrorValue(response.response.data.message);
          }
          setImageRegist(avatarImage);
        });
    } catch (error) {
      console.log("error");
      console.log(error);
      window.location.href = "/";
      if (error.request.status === 501) {
        console.log(error);
        return console.log(error.response.data.message);
      }
    }
  }

  return (
    <div className="containers container">
      <div className="containerForm">
        <h1 style={{ fontSize: "28px" }}>Registration</h1>
        <br />
        {errorValue ? (
          <p style={{ color: "red", fontSize: "14px" }}>{errorValue}</p>
        ) : (
          ""
        )}
        <form>
          <label htmlFor=""></label>

          <MyInput
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            type="text"
            placeholder="Email"
          />
          <label htmlFor=""></label>
          <MyInput
            style={{
              marginTop: "30px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            type="text"
            placeholder="Firs Name"
          />
          <label htmlFor=""></label>
          <MyInput
            style={{
              marginTop: "30px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            type="text"
            placeholder="Last Name"
          />
          <label htmlFor=""></label>
          <MyInput
            style={{
              marginTop: "30px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            type="text"
            placeholder="Password"
          />

          {/* // */}
          <div style={{ position: "relative", lineHeight: "25px" }}>
            <input
              id="imageInputRegist"
              className="fileInput"
              type="file"
              onChange={(e) => {
                setImageRegist(e.target.files[0]);
                setImageValueRegist("uploaded");
              }}
            />
            <span className="fileInputSpan">
              <label for="imageInputRegist">{imageValue}</label>
            </span>
          </div>
          {/*  */}

          <MyButton
            style={{ width: "200px", marginTop: "25px" }}
            onClick={registrationUser}
          >
            Login
          </MyButton>
        </form>
        <p
          style={{ fontSize: "18px", marginTop: "25px", marginBottom: "10px" }}
        >
          Have an account?{" "}
          <Link to="/user/authorization" style={{ color: "blue" }}>
            Log in now!
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Registration;
