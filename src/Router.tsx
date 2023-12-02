import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";

import ApplicationFrame from "./pages/ApplicationFrame";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import TournamentDetails from "./pages/TournamentDetails";

export default function Router() {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<ApplicationFrame />}>
        {user && <Route path="/home" element={<Home />} />}
        {user === undefined && (
          <Route path="/home" element={<div className="m-10 text-3xl font-bold">Loading...</div>} />
        )}
        {user === undefined && <Route path="/" element={<Login />} />}
      </Route>
      <Route path="/tournament/:uuid" element={<TournamentDetails />} />
      <Route path="*" element={<div className="text-3xl font-bold">Page not found</div>} />
    </Routes>
  );
}
