import React from "react";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TableRowProps {
  num: string;
  team1: string;
  team2: string;
  result?: string;
}

export default function TableRow({ num, team1, team2, result }: TableRowProps) {
  return (
    <>
      <div className={"table grid w-96  border-collapse grid-cols-10 text-center"}>
        <div className={"border border-slate-400 text-xl"}>{num}</div>
        <div className={"col-span-2 border border-slate-200 text-xl"}>{team1}</div>
        <div className={"col-span-2 border border-slate-100 text-xl"}>{team2}</div>
        <div className={"col-span-5 flex flex-row items-center justify-between border border-slate-400 text-xl"}>
          <input className={"w-full px-2"} placeholder={result ? result : "Unesite rezultat"} />
          <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
        </div>
      </div>
    </>
  );
}
