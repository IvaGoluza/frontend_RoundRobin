import React from "react";

import { MatchProps } from "./Tournament";

export interface TableRowNoInputsProps {
  num: number;
  match: MatchProps;
}

export default function TableRowNoInputs({ num, match }: TableRowNoInputsProps) {
  return (
    <>
      <div className={"border border-slate-100 text-slate-400"}>{num}</div>
      <div className={"col-span-2 border border-slate-100 text-slate-400"}>{match.team1.teamName}</div>
      <div className={"col-span-2 border border-slate-100 text-slate-400"}>{match.team2.teamName}</div>
      <div className={"col-span-5 border border-slate-100 text-slate-400"}>{match.result}</div>
    </>
  );
}
