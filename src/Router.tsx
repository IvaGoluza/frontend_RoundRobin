import React from "react";

import { Route, Routes } from "react-router-dom";

import ApplicationFrame from "./pages/ApplicationFrame";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import TournamentDetails from "./pages/TournamentDetails";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationFrame />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/tournament/:uuid" element={<TournamentDetails />} />
      <Route path="*" element={<div className="h1">Page not found</div>} />
    </Routes>
  );
}
