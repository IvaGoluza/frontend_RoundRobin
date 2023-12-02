import React from "react";

export interface UserProps {
  id: number;
  userName: string;
  email: string;
}

export interface ScoreSystemProps {
  id: number;
  win: number;
  tie: number;
  loss: number;
}

export interface TeamProps {
  id: number;
  teamName: string;
  teamScore: number;
  tourId: number;
}

export interface MatchProps {
  id: number;
  result?: string;
  team1: TeamProps;
  team2: TeamProps;
}

export interface RoundProps {
  id: number;
  matches: MatchProps[];
  tourId: number;
  setTournamentInfo?: React.Dispatch<React.SetStateAction<TournamentProps | null>>;
  noInputs?: boolean | null;
}

export interface TournamentProps {
  id: number;
  link: string;
  tourName: string;
  user: UserProps;
  scoreSystem: ScoreSystemProps;
  rounds: RoundProps[];
  tournamentInfo: TournamentProps | null;
  setTournamentInfo: React.Dispatch<React.SetStateAction<TournamentProps | null>>;
}

export interface TournamentsInfoProps {
  tournament: TournamentProps;
  setTables: React.Dispatch<React.SetStateAction<boolean>>;
  setPicture: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentInfo: TournamentProps | null;
  setTournamentInfo: React.Dispatch<React.SetStateAction<TournamentProps | null>>;
}

export default function Tournament({
  tournament,
  setTables,
  setPicture,
  setForm,
  tournamentInfo,
  setTournamentInfo,
}: TournamentsInfoProps) {
  const borderColorClass =
    tournamentInfo == tournament ? "border-green-400 text-green-400 font-bold border-2" : "border-gray-400";

  return (
    <>
      <div
        className={`my-2 flex w-full cursor-pointer flex-col items-start max-lg:items-center`}
        onClick={() => {
          setPicture(false);
          setForm(false);
          setTables(true);
          setTournamentInfo(tournament);
        }}
      >
        <div className={`w-3/4 rounded-full border py-1 text-center text-gray-400 ${borderColorClass}`}>
          {tournament.tourName}
        </div>
      </div>
    </>
  );
}
