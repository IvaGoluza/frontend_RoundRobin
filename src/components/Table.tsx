import React from "react";

import { nanoid } from "nanoid";

import TableRow from "./TableRow";
import TableRowNoInputs from "./TableRowNoInputs";
import { MatchProps, RoundProps } from "./Tournament";

export default function Table({ matches, tourId, setTournamentInfo, noInputs }: RoundProps) {
  return (
    <>
      <div className={"table grid w-96  border-collapse grid-cols-10 text-center"}>
        <div className={"border border-white bg-cyan-50 font-bold text-slate-500"}>#</div>
        <div className={"col-span-2 border border-white bg-cyan-50 font-bold text-slate-500"}>Tim1</div>
        <div className={"col-span-2 border border-white bg-cyan-50 font-bold text-slate-500"}>Tim2</div>
        <div className={"col-span-5 border border-white bg-cyan-50 font-bold text-slate-500"}>Rezultat</div>
        {noInputs &&
          matches
            .sort((a: MatchProps, b: MatchProps) => a.id - b.id)
            .map((row: MatchProps, i: number) => <TableRowNoInputs key={nanoid()} num={i + 1} match={row} />)}
        {!noInputs &&
          matches
            .sort((a: MatchProps, b: MatchProps) => a.id - b.id)
            .map((row: MatchProps, i: number) => (
              <TableRow key={nanoid()} num={i + 1} match={row} tourId={tourId} setTournamentInfo={setTournamentInfo} />
            ))}
      </div>
    </>
  );
}
