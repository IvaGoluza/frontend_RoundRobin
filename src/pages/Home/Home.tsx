import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useQuery, useQueryClient } from "react-query";

import CreateTournamentForm from "../../components/CreateTournamentForm";
import Tournament, { TournamentProps } from "../../components/Tournament";
import TournamentInfo from "../../components/TournamentInfo";

export default function Home() {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<loggedInUserType | null>(null);
  const [form, setForm] = useState<boolean>(false);
  const [picture, setPicture] = useState<boolean>(true);
  const [tables, setTables] = useState<boolean>(false);
  const [tournamentInfo, setTournamentInfo] = useState<TournamentProps | null>(null);
  const { user, error } = useAuth0();
  type loggedInUserType = {
    id: number;
    userName: string;
    email: string;
  };

  const fetchData = async () => {
    const response = await axios.get("https://roundrobinbackend.onrender.com/api/tournaments/" + currentUser?.id);
    return response.data;
  };

  const { data, isLoading } = useQuery(["tournaments"], fetchData, {
    enabled: !!currentUser,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (user) {
      axios
        .post("https://roundrobinbackend.onrender.com/api/login", {
          userName: user.name,
          email: user.email,
        })
        .then((res) => res.data)
        .then((data: loggedInUserType) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      queryClient.refetchQueries(["tournaments"]);
    }
  }, [currentUser, queryClient]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  } else
    return (
      <>
        <div className={"flex h-screen w-full max-lg:h-auto"}>
          <div
            className={
              "m-auto ml-24 grid h-3/4 w-full grid-cols-3 grid-rows-1 justify-center pl-0 pr-10 max-lg:my-32 max-lg:ml-0 max-lg:flex max-lg:min-h-full max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:px-4"
            }
          >
            <div className={"col-span-1 flex h-full flex-col items-start justify-start max-lg:items-center"}>
              <div>
                <div className={"max-lg:text-center"}>
                  <h1 className={"mb-1 text-5xl font-bold text-indigo-500"}>Pozdrav {user?.name},</h1>
                  <h3 className={"mb-4 ml-1 text-3xl font-semibold text-indigo-500"}>ovo su Vaša natjecanja</h3>
                </div>
                <div className={"mt-10 flex w-full flex-col items-center justify-start max-lg:justify-center"}>
                  {isLoading && <div>Loading...</div>}
                  {data &&
                    data.map((tournament: TournamentProps) => (
                      <Tournament
                        key={nanoid()}
                        tournament={tournament}
                        setTables={setTables}
                        setPicture={setPicture}
                        setForm={setForm}
                        tournamentInfo={tournamentInfo}
                        setTournamentInfo={setTournamentInfo}
                      />
                    ))}
                </div>
              </div>
              <div className={"my-10 flex flex-row items-center"}>
                <div
                  className={
                    !form
                      ? "h-15 w-15 my-4 ml-0 mr-2 cursor-pointer rounded-full bg-indigo-500 px-4 pb-3 pt-1 text-center align-middle text-4xl font-black text-white"
                      : "h-15 w-15 my-4 ml-0 mr-2 cursor-pointer rounded-full bg-indigo-500 px-5 pb-3 pt-1 text-center align-middle text-4xl font-black text-white"
                  }
                  onClick={() => {
                    if (tables) setPicture(false);
                    else setPicture((prevState) => !prevState);
                    setForm((prevState) => !prevState);
                    setTables(false);
                    setTournamentInfo(null);
                  }}
                >
                  {!form ? "+" : "-"}
                </div>
                <h3 className={"ml-1 text-xl font-semibold text-indigo-500"}>Kreiraj novo natjecanje</h3>
              </div>
            </div>
            {picture && (
              <img src="/roundRobin.jpg" alt="roundRobinHome" className="col-span-2 mx-28 ml-24 mt-20 h-3/5" />
            )}
            {tables && tournamentInfo && (
              <TournamentInfo
                id={tournamentInfo.id}
                tourName={tournamentInfo.tourName}
                user={tournamentInfo.user}
                scoreSystem={tournamentInfo.scoreSystem}
                rounds={tournamentInfo.rounds}
                tournamentInfo={tournamentInfo}
                setTournamentInfo={setTournamentInfo}
                link={tournamentInfo.link}
              />
            )}
            {form && currentUser && <CreateTournamentForm id={currentUser.id} />}
          </div>
        </div>
      </>
    );
}
