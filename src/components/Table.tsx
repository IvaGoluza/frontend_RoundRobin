import React from "react";

import { nanoid } from "nanoid";

import TableRow, { TableRowProps } from "./TableRow";

interface TableProps {
  rows: TableRowProps[];
}

export default function Table({ rows }: TableProps) {
  return (
    <>
      <div className={"table grid w-96  border-collapse grid-cols-10 text-center"}>
        <div className={"border border-slate-300 text-xl font-bold"}>#</div>
        <div className={"col-span-2 border border-slate-300 text-xl font-bold"}>Tim1</div>
        <div className={"col-span-2 border border-slate-200 text-xl font-bold"}>Tim2</div>
        <div className={"col-span-5 border border-slate-200 text-xl font-bold"}>Rezultat</div>
        {rows.map((row: TableRowProps) => (
          <TableRow key={nanoid()} num={row.num} team1={row.team1} team2={row.team2} result={row?.result} />
        ))}
      </div>
    </>
  );
}
