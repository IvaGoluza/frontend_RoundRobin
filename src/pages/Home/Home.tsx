import React from "react";

import { Link } from "react-router-dom";

import { routes } from "../../api/paths";

export default function Home() {
  return (
    <>
      <div className={"flex h-screen w-full"}>
        <div className={"m-auto flex flex-row  items-center justify-center max-lg:flex-col"}>
          <img src="../../images/roundRobin.jpg" alt="roundRobinHome" className="mb-8 mr-3 h-2/5 w-2/6" />
          <div className={"mb-8 flex h-96 flex-col items-start justify-between max-lg:items-center"}>
            <div className={"h-full max-lg:text-center"}>
              <h1 className={"mb-4 text-8xl font-black"}>Round Robin</h1>
              <h3 className={"mb-4 ml-1 text-3xl font-semibold"}> Kreirajte i pratite Vaša natjecanja</h3>
            </div>
            <Link
              to={routes.USER_LOGIN_URL}
              className="ml-2 mt-16 inline-block w-2/5 rounded-full bg-cyan-400 p-6 text-center text-white no-underline hover:bg-cyan-300"
            >
              <b className={"text-xl tracking-widest hover:tracking-wide"}>PRIJAVA</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
