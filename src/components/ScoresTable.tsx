import React from "react";

import { nanoid } from "nanoid";

import ScoresTableRow from "./ScoresTableRow";
import { TeamProps } from "./Tournament";

export interface ScoresTableProps {
  rows: TeamProps[];
}

export default function ScoresTable({ rows }: ScoresTableProps) {
  return (
    <>
      <div className={"mt-3 table grid  w-96 border-collapse grid-cols-6 text-center"}>
        <div className={"border border-white bg-cyan-50 py-1 font-bold text-slate-500"}>#</div>
        <div className={"col-span-3 border border-white bg-cyan-50 py-1 font-bold text-slate-500"}>Natjecatelj</div>
        <div className={"col-span-2 border border-white bg-cyan-50 py-1 font-bold text-slate-500"}>Bodovi</div>
        {rows.map((row: TeamProps, i: number) => (
          <ScoresTableRow key={nanoid()} num={i + 1} team={row.teamName} score={row.teamScore} />
        ))}
      </div>
    </>
  );
}
