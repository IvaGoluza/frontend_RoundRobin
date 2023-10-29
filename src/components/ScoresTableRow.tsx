import React from "react";

export interface ScoresTableRowProps {
  num: number;
  team: string;
  score: number;
}

export default function ScoresTableRow({ num, team, score }: ScoresTableRowProps) {
  return (
    <>
      <div className={"border border-slate-100 pt-1 text-slate-400"}>{num}</div>
      <div className={"col-span-3 border border-slate-100 pt-1 text-slate-400"}>{team}</div>
      <div className={"col-span-2 border border-slate-100 text-xl text-slate-400"}>{score}</div>
    </>
  );
}
