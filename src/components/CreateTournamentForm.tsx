import React from "react";

import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

import ValidationSchema from "./ValidationSchema";

type CreateTournamentFormProps = {
  id: number;
};

export default function CreateTournamentForm({ id }: CreateTournamentFormProps) {
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

  const queryClient = useQueryClient();

  const onSubmit = async (values: formTypes, formikHelpers: FormikHelpers<formTypes>) => {
    const data = {
      tourName: values.title,
      teams: values.teams,
      scoreSystem: values.scoreSystem,
      userId: id,
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

  return (
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
                <span className={"text-sm font-normal text-indigo-400"}>(format: pobjeda/remi/poraz)</span>
              </label>
              <div className="relative w-2/3 rounded-md">
                <Field
                  type="text"
                  name="scoreSystem"
                  placeholder="2/1/0"
                  className={
                    touched.scoreSystem && errors.scoreSystem ? ERROR : "mt-1 w-96 rounded-lg border p-2 text-start"
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
  );
}
