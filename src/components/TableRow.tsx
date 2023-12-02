import React, { useState } from "react";

import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { MatchProps, TournamentProps } from "./Tournament";
import { faPenToSquare } from "../../node_modules/@fortawesome/free-solid-svg-icons/faPenToSquare";
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome";

export interface TableRowProps {
  num: number;
  match: MatchProps;
  tourId: number;
  setTournamentInfo?: React.Dispatch<React.SetStateAction<TournamentProps | null>>;
}

interface UpdateMatchResultType {
  matchId: number;
  tourId: number;
  score: string;
}

export default function TableRow({ num, match, tourId, setTournamentInfo }: TableRowProps) {
  const queryClient = useQueryClient();
  const [result, setResult] = useState<string>("");
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const updateData = async (data: UpdateMatchResultType) => {
    const response = await axios.put("https://roundrobinbackend.onrender.com/api/match", data);

    return response.data;
  };

  const updateMutation = useMutation(updateData);

  const handleResultUpdate = async () => {
    const regex = /^\d+:\d+$/;
    if (!regex.test(result)) {
      setError(true);
      setResult("[format] broj:broj");
      return;
    }
    setError(false);
    const data = {
      matchId: match.id,
      tourId: tourId,
      score: result,
    };
    try {
      await updateMutation
        .mutateAsync(data)
        .then(() => queryClient.refetchQueries(["tournaments"]))
        .then(async () => {
          const response = await axios.get("https://roundrobinbackend.onrender.com/api/tournament/" + tourId);
          if (setTournamentInfo !== undefined) setTournamentInfo(response.data);
        });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <>
      <div className={"border border-slate-100 text-slate-400"}>{num}</div>
      <div className={"col-span-2 border border-slate-100 text-slate-400"}>{match.team1.teamName}</div>
      <div className={"col-span-2 border border-slate-100 text-slate-400"}>{match.team2.teamName}</div>
      <div className={"col-span-5 flex flex-row items-center justify-between border border-slate-100"}>
        <input
          className={error ? "w-full border border-red-700 px-2 text-center text-red-700" : "w-full px-2 text-center"}
          placeholder={match.result ? match.result : "Unesite rezultat"}
          value={result}
          onChange={(e) => {
            setResult(e.target.value);
            setShowIcon(e.target.value.trim() !== "");
          }}
          onClick={() => setResult("")}
        />
        {showIcon && <FontAwesomeIcon icon={faPenToSquare} className="mx-2" onClick={handleResultUpdate} />}
      </div>
    </>
  );
}
