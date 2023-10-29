import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <>
      <div className={"flex w-full flex-row justify-between"}>
        <h1 className={"ml-5 mt-3 text-4xl font-black text-cyan-400"}>Round Robin</h1>
        {isAuthenticated && (
          <FontAwesomeIcon icon={faRightFromBracket} onClick={() => logout()} className="fa-2xl mr-5 mt-6" />
        )}
      </div>
    </>
  );
}
