import React, { useEffect, useState } from "react";

import { faRankingStar, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

import ScoresTable from "../components/ScoresTable";
import Table from "../components/Table";
import { MatchProps, RoundProps, ScoreSystemProps, TeamProps, UserProps } from "../components/Tournament";

interface TournamentDetails {
  id: number;
  link: string;
  tourName: string;
  user: UserProps;
  scoreSystem: ScoreSystemProps;
  rounds: RoundProps[];
}

export default function TournamentDetails() {
  const [data, setData] = useState<TournamentDetails | null>(null);
  const { uuid } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://roundrobinbackend.onrender.com/api/tournament-by-link/" + uuid);
      setData(response.data);
    };

    getData();
  }, []);

  const teamSet = new Set<TeamProps>();
  if (data && data.rounds !== undefined) {
    data.rounds[0].matches.forEach((match: MatchProps) => {
      teamSet.add(match.team1);
      teamSet.add(match.team2);
    });
  }

  const teamArray = Array.from(teamSet);
  teamArray.sort((a, b) => b.teamScore - a.teamScore);
  return (
    <>
      <h1 className={"mt-36 text-center text-2xl font-bold text-cyan-700"}>{data?.tourName}</h1>
      <div
        className={
          "show-tournament h-min-3/4 mx-auto my-10 flex h-fit w-fit flex-row justify-start justify-between rounded-lg px-8 pt-8 shadow-md max-lg:flex-col max-lg:items-center max-lg:justify-center"
        }
      >
        <div className={"mr-5"}>
          <h1 className={"mb-12 text-xl font-bold"}>
            <FontAwesomeIcon icon={faTable} className="fa-xl mr-2" />
            Raspored po kolima
          </h1>
          <div className={"rounds-tables"}>
            {data &&
              data.rounds &&
              data.rounds.map((round: RoundProps, i: number) => (
                <div key={nanoid()} className={"my-5"}>
                  <h2 className="text-xl font-bold text-indigo-500">Kolo{i + 1}</h2>
                  <Table id={round.id} matches={round.matches} tourId={data.id} noInputs={true} />
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
    </>
  );
}
