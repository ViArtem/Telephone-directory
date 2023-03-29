import React from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { createBrowserHistory } from "history";
import { setAuthToken } from "./axios/axiosHeaders";

const history = createBrowserHistory();

function App() {
  const access = localStorage.getItem("Authorization");
  const refresh = localStorage.getItem("Refresh");

  if (access) {
    setAuthToken(access, refresh);
  }
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
