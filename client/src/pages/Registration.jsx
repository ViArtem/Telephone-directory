import React, { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

const Registration = () => {
  const [image, setImage] = useState(null);
  const [imageValue, setImageValue] = useState("click to upload");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorValue, seterrorValue] = useState("");

  async function registrationUser(e) {
    try {
      e.preventDefault();
      if (image) {
        const data = new FormData();
        data.append("firstName", newUser.firstName);
        data.append("lastName", newUser.lastName);
        data.append("email", newUser.email);
        data.append("password", newUser.password);
        data.append("avatar", image);
        await axios
          .post("http://localhost:4000/user/registration", data)
          .then((response) => {
            console.log(response);

            if (response.response.status == 400) {
              return seterrorValue(response.response.data.message);
            }
            setImage("");
          });
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/";
      if (error.request.status == 501) {
        console.log(error);
        return console.log(error.response.data.message);
      }

      console.log(error);
    }
  }

  return (
    <div className="containers container">
      <div className="containerForm">
        <h2>Registration</h2>
        <br />
        {errorValue ? <p style={{ color: "red" }}>{errorValue}</p> : ""}
        <form>
          <label htmlFor="">EMAIL</label>

          <MyInput
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            type="text"
            placeholder="hello@gmail.com"
          />
          <label htmlFor="">FIRST NAME</label>
          <MyInput
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            type="text"
            placeholder="John"
          />
          <label htmlFor="">LAST NAME</label>
          <MyInput
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            type="text"
            placeholder="Doe"
          />
          <label htmlFor="">PASSWORD</label>
          <MyInput
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              padding: "8px",
              fontSize: "14px",
            }}
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            type="text"
            placeholder="password"
          />

          {/* // */}
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
