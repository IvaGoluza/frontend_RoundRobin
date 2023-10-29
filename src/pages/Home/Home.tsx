import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";

import Tournament, { TournamentProps } from "../../components/Tournament";
import TournamentInfo from "../../components/TournamentInfo";
import ValidationSchema from "../../components/ValidationSchema";

export default function Home() {
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<loggedInUserType | null>(null);
  const [form, setForm] = useState<boolean>(false);
  const [picture, setPicture] = useState<boolean>(true);
  const [tables, setTables] = useState<boolean>(false);
  const [tournamentInfo, setTournamentInfo] = useState<TournamentProps | null>(null);
  const { user, error } = useAuth0();
  const ERROR = "w-96 rounded-lg mt-1 border-2 border-rose-500 p-2 text-start";
  type formTypes = {
    title: string;
    teams: string;
    scoreSystem: string;
  };
  const initialValues: formTypes = {
    title: "",
    teams: "",
    scoreSystem: "",
  };

  type loggedInUserType = {
    id: number;
    userName: string;
    email: string;
  };

  const fetchData = async () => {
    console.log(currentUser);
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
          console.log(user);
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

  const onSubmit = async (values: formTypes, formikHelpers: FormikHelpers<formTypes>) => {
    const data = {
      tourName: values.title,
      teams: values.teams,
      scoreSystem: values.scoreSystem,
      userId: currentUser?.id,
    };
    axios({
      method: "post",
      url: "https://roundrobinbackend.onrender.com/api/tournaments",
      data: data,
    })
      .then((res) => {
        queryClient.refetchQueries(["tournaments"]);
        toast.success("Stvorili ste novo natjecanje. ", {
          position: "bottom-center",
          duration: 3000,
          className: "scale-125",
        });
        console.log(res);
        formikHelpers.resetForm();
        formikHelpers.setErrors({});
      })
      .catch((err) => console.log(err));
  };

  if (error) {
    return <div>Oops... {error.message}</div>;
  } else
    return (
      <>
        <div className={"flex h-screen w-full"}>
          <div
            className={
              "m-auto grid h-3/4 w-full grid-cols-3 grid-rows-1 justify-center pl-40 pr-96 max-lg:my-96 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:px-4 max-lg:pt-40"
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
              <img
                src="../../images/roundRobin.jpg"
                alt="roundRobinHome"
                className="col-span-2 mx-28 ml-24 mt-20 h-3/5"
              />
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
            {form && (
              <div className={"create-tournament col-span-2"}>
                <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={onSubmit}>
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="flex min-h-max w-fit flex-col items-center justify-center rounded-lg px-8 py-10 shadow-md max-lg:mb-20 max-lg:h-auto 2xl:ml-40">
                      <div className="my-4 flex max-w-md flex-col items-start justify-center">
                        <label htmlFor="title" className="text-xl font-bold text-indigo-400">
                          Naziv natjecanja
                        </label>
                        <div className="relative w-2/3 rounded-md">
                          <Field
                            type="text"
                            name="title"
                            placeholder="Upišite naziv natjecanja"
                            className={
                              touched && touched.title && errors && errors.title
                                ? ERROR
                                : "mt-1 w-96 rounded-full border p-2 text-start"
                            }
                          />
                          {touched && touched.title && errors && errors.title && (
                            <p className="pl-4 text-sm text-rose-500">{errors.title}</p>
                          )}
                        </div>
                      </div>
                      <div className="my-4 flex max-w-md flex-col items-start justify-center">
                        <label htmlFor="description" className="text-xl font-bold text-indigo-400">
                          Popis natjecatelja{" "}
                          <span className={"whitespace-nowrap text-sm font-normal text-indigo-400"}>
                            (odvojeni novim redom ili znakom ;)
                          </span>
                        </label>
                        <Field
                          as="textarea"
                          name="teams"
                          className={
                            touched.teams && errors.teams
                              ? "mt-1 h-40 w-96 rounded-lg border-2 border-rose-500 p-2 text-start"
                              : "mt-1 h-40 w-96 rounded-lg border p-2 text-start"
                          }
                          placeholder="John;Doe;Jane;Mary"
                        ></Field>
                        {touched && touched.teams && errors && errors.teams && (
                          <p className="pl-4 text-sm text-rose-500">{errors.teams}</p>
                        )}
                      </div>
                      <div className="my-4 flex max-w-md flex-col items-start justify-center">
                        <label htmlFor="title" className="text-xl font-bold text-indigo-400">
                          Sustav bodovanja{" "}
                          <span className={"text-sm font-normal text-indigo-400"}>(format: pobjeda/remi/prolaz)</span>
                        </label>
                        <div className="relative w-2/3 rounded-md">
                          <Field
                            type="text"
                            name="scoreSystem"
                            placeholder="2/1/0"
                            className={
                              touched.scoreSystem && errors.scoreSystem
                                ? ERROR
                                : "mt-1 w-96 rounded-lg border p-2 text-start"
                            }
                          />
                          {touched && touched.scoreSystem && errors && errors.scoreSystem && (
                            <p className="pl-4 text-sm text-rose-500">{errors.scoreSystem}</p>
                          )}
                        </div>
                      </div>
                      <button
                        disabled={isSubmitting}
                        type={"submit"}
                        className="m-4 mt-16 rounded-3xl bg-cyan-400 px-7 py-2 font-bold text-white hover:bg-cyan-300"
                      >
                        KREIRAJ NATJECANJE
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </>
    );
}
