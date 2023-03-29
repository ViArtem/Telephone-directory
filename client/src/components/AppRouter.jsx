import React from "react";
import "../styles/App.css";
import Authorization from "../pages/Authorization";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteGuard from './RouteGuard'
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function AppRouter() {
  return (
    <Routes >
      {/* <Route path="*" element={<RouteGuard><Home /></RouteGuard>} /> */}
      <Route path="*" element={<RouteGuard component={Home} />} />
      <Route path="/user/registration" element={<Registration />} />
      <Route path="/user/authorization" element={<Authorization />} />
      <Route
        path="*"
        element={<Navigate to="/user/authorization" replace />}
    />
    </Routes>
  );
}

export default AppRouter;
