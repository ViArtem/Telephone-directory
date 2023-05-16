import React, { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Auth.css";
const Authorization = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [serverResponse, setserverResponse] = useState("");

  function exit(e) {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}user/authorization`, user)
      .then((response) => {
        if (response.response.status == 400) {
          return setserverResponse(`${response.response.data.message}`);
        }
      })
      .catch((e) => {
        window.location.href = "/";
        console.log(e);
      });
  }

  return (
    <div className="containers container">
      <div className="authForm">
        <h1 className="authFormHeader">Log in to your account</h1>
        <div className="authFormForm">
          <form>
            <label htmlFor=""></label>

            {serverResponse ? (
              <p style={{ color: "red" }}>{serverResponse}</p>
            ) : (
              ""
            )}

            <MyInput
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                background: "transparent",
              }}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
              placeholder="Email"
            />

            <label htmlFor=""></label>
            <MyInput
              style={{
                marginTop: "30px",
                marginBottom: "20px",
                background: "transparent",
              }}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="Password"
              placeholder="your password"
            />

            <MyButton onClick={exit} style={{ width: "200px" }}>
              Log in
            </MyButton>
          </form>
        </div>
        <p
          style={{ fontSize: "18px", marginTop: "25px", marginBottom: "10px" }}
        >
          Don't have an account?{" "}
          <Link to="/user/registration" style={{ color: "blue" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Authorization;
