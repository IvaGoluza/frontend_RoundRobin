import React from "react";

import { Route, Routes } from "react-router-dom";

import { routes } from "./api/paths";
import ApplicationFrame from "./pages/ApplicationFrame";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Tournaments from "./pages/Tournaments/Tournaments";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationFrame />}>
        <Route path={routes.TOURNAMENTS_LOGGED_URL} element={<Tournaments />} />
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path={routes.USER_LOGIN_URL} element={<Login />} />
      <Route path="*" element={<div className="h1">Page not found</div>} />
    </Routes>
  );
}
