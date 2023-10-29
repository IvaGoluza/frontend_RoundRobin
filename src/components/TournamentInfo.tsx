import React from "react";

import { faTable, faRankingStar, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { nanoid } from "nanoid";

import ScoresTable from "./ScoresTable";
import Table from "./Table";
import { MatchProps, RoundProps, TeamProps, TournamentProps } from "./Tournament";

export default function TournamentInfo({
  id,
  rounds,
  scoreSystem,
  link,
  user,
  tourName,
  tournamentInfo,
  setTournamentInfo,
}: TournamentProps) {
  const teamSet = new Set<TeamProps>();
  if (rounds !== undefined) {
    rounds[0].matches.forEach((match: MatchProps) => {
      teamSet.add(match.team1);
      teamSet.add(match.team2);
    });
  }

  const teamArray = Array.from(teamSet);
  teamArray.sort((a, b) => b.teamScore - a.teamScore);
  return (
    <>
      <div className={"relative"}>
        <div
          className={
            "show-tournament h-min-3/4 col-span-2 mb-10 flex h-fit w-fit flex-row justify-start justify-between rounded-lg px-8 pt-8 shadow-md max-lg:flex-col max-lg:items-center max-lg:justify-center 2xl:ml-40"
          }
        >
          <div className={"mr-5"}>
            <h1 className={"mb-12 text-xl font-bold"}>
              <FontAwesomeIcon icon={faTable} className="fa-xl mr-2" />
              Raspored po kolima
            </h1>
            <div className={"rounds-tables"}>
              {rounds &&
                rounds.map((round: RoundProps, i: number) => (
                  <div key={nanoid()} className={"my-5"}>
                    <h2 className="text-xl font-bold text-indigo-500">Kolo{i + 1}</h2>
                    <Table id={round.id} matches={round.matches} tourId={id} setTournamentInfo={setTournamentInfo} />
                  </div>
                ))}
            </div>
          </div>
          <div className={"ml-10 max-lg:my-16 max-lg:ml-0"}>
            <h1 className={"mb-12 text-xl font-bold"}>
              <FontAwesomeIcon icon={faRankingStar} className="fa-xl mr-2" />
              Trenutni poredak
            </h1>
            <ScoresTable rows={teamArray} />
          </div>
        </div>
        <div className={"absolute ml-40 flex flex-row max-lg:m-auto"}>
          <FontAwesomeIcon icon={faLink} className="fa-xl mr-2 text-blue-400" />
          <a href={link} className={"whitespace-nowrap text-blue-400 underline underline-offset-2"}>
            {link}
          </a>
        </div>
      </div>
    </>
  );
}
