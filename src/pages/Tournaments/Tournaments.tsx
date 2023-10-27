import React from "react";

import { faPenToSquare, faTable, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const picture = false;

export default function Tournaments() {
  return (
    <>
      <div className={"flex h-screen w-full"}>
        <div
          className={
            "m-auto flex h-3/4 w-full flex-row  items-start justify-center max-lg:flex-col max-lg:items-center"
          }
        >
          <div className={"flex h-full flex-col items-start justify-between max-lg:items-center"}>
            <div>
              <div className={"max-lg:text-center"}>
                <h1 className={"mb-1 text-5xl font-bold text-indigo-500"}>Pozdrav Admin,</h1>
                <h3 className={"mb-4 ml-1 text-3xl font-semibold text-indigo-500"}>ovo su Vaša natjecanja</h3>
              </div>
              <div className={"mt-10 flex w-full flex-col items-center justify-start max-lg:justify-center"}>
                {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
                <div className={"my-2 flex w-full flex-col items-start max-lg:items-center"}>
                  <div className={"w-3/4 rounded-full border border-gray-400 py-1 text-center text-gray-400"}>
                    Nogometni turnir
                  </div>
                </div>
                <div className={"my-2 flex w-full flex-col items-start max-lg:items-center"}>
                  <div className={"w-3/4 rounded-full border border-gray-400 py-1 text-center text-gray-400"}>
                    Nogometni turnir 2
                  </div>
                </div>
                <div className={"my-2 flex w-full flex-col items-start max-lg:items-center"}>
                  <div className={"w-3/4 rounded-full border border-gray-400 py-1 text-center text-gray-300"}>
                    Nogometni turnir 3
                  </div>
                </div>
              </div>
            </div>
            <div className={"my-10 flex flex-row items-center"}>
              <div
                className={
                  "h-15 w-15 my-4 ml-0 mr-2 rounded-full bg-indigo-500 px-4 pb-3 pt-1 text-center align-middle text-4xl font-black text-white"
                }
              >
                +
              </div>
              <h3 className={"ml-1 text-xl font-semibold text-indigo-500"}>Kreiraj novo natjecanje</h3>
            </div>
          </div>
          {picture && <img src="../../images/roundRobin.jpg" alt="roundRobinHome" className=" mb-8 ml-24 h-full" />}
          <div
            className={
              "show-tournament ml-4 flex h-3/4 flex-row justify-start justify-between rounded-lg px-8 shadow-md max-lg:flex-col max-lg:items-center max-lg:justify-center 2xl:ml-40"
            }
          >
            <div className={"mr-5"}>
              <h1 className={"mb-12 text-xl font-bold"}>
                <FontAwesomeIcon icon={faTable} className="fa-xl mr-2" />
                Raspored po kolima
              </h1>
              <div className={"rounds-tables"}>
                <div className={"round"}>
                  <h2 className={"text-xl font-bold text-indigo-500"}>Kolo1</h2>
                  <div className={"table grid w-96  border-collapse grid-cols-10 text-center"}>
                    <div className={"border border-slate-300 text-xl font-bold"}>#</div>
                    <div className={"col-span-2 border border-slate-300 text-xl font-bold"}>Tim1</div>
                    <div className={"col-span-2 border border-slate-200 text-xl font-bold"}>Tim2</div>
                    <div className={"col-span-5 border border-slate-200 text-xl font-bold"}>Rezultat</div>
                    <div className={"border border-slate-400 text-xl"}>#</div>
                    <div className={"col-span-2 border border-slate-200 text-xl"}>Tim1</div>
                    <div className={"col-span-2 border border-slate-100 text-xl"}>Tim2</div>
                    <div
                      className={
                        "col-span-5 flex flex-row items-center justify-between border border-slate-400 text-xl"
                      }
                    >
                      <input className={"w-full px-2"} />
                      <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
                    </div>
                    <div className={"border border-slate-400 text-xl"}>#</div>
                    <div className={"col-span-2 border border-slate-400 text-xl"}>Tim1</div>
                    <div className={"col-span-2 border border-slate-400 text-xl"}>Tim2</div>
                    <div
                      className={
                        "col-span-5 flex flex-row items-center justify-between border border-slate-400 text-xl"
                      }
                    >
                      <input className={"w-full px-2"} />
                      <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"ml-10 max-lg:my-16 max-lg:ml-0"}>
              <h1 className={"mb-12 text-xl font-bold"}>
                <FontAwesomeIcon icon={faTrophy} className="fa-xl mr-2" />
                Trenutni poredak
              </h1>
              <div className={"mt-5 table grid  w-96 border-collapse grid-cols-6 text-center"}>
                <div className={"border border-slate-300 text-xl font-bold"}>#</div>
                <div className={"col-span-3 border border-slate-300 text-xl font-bold"}>Natjecatelj</div>
                <div className={"col-span-2 border border-slate-200 text-xl font-bold"}>Bodovi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
