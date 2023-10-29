import React from "react";

import { Formik, FormikHelpers, Form } from "formik";
import { Link } from "react-router-dom";

import { routes } from "../../api/paths";
import TextInput from "../../components/TextInput";

export default function Login() {
  return (
    <>
      <div className={"flex h-screen w-full"}>
        <div className={"m-auto flex flex-row  items-center justify-center max-lg:flex-col"}>
          <div className={"mb-8 mr-40 h-1/3 w-2/6"}>
            <img src="../../images/roundRobin.jpg" alt="roundRobinHome" className="" />
            <h1 className={"mb-4 text-center text-6xl font-extrabold text-cyan-400"}>Round Robin</h1>
          </div>
          <div className={"mb-8 flex h-96 w-1/3 flex-col items-start justify-between max-lg:items-center"}>
            <Form className="register min-h-screen">
              <div className="loginForm">
                <TextInput
                  name="email"
                  className="regInput"
                  label="Email adresa"
                  type="text"
                  errors={errors}
                  placeholder="Unesite Email adresu"
                  touched={touched}
                />
                <TextInput
                  name="password"
                  className="regInput"
                  label="Lozinka"
                  type="password"
                  errors={errors}
                  placeholder="Unesite lozinku"
                  touched={touched}
                />
                {serverError.length > 0 && <p className="error">{serverError}</p>}
                <button disabled={isSubmitting} type="submit" className="registerButton">
                  Prijava
                </button>
                <Link to={routes.USER_REGISTRATION_URL} className="text-blue-700">
                  Nemate korisnički račun? Registrirajte se.
                </Link>
              </div>
            </Form>
          </div>
          <Link
            to="/login"
            className="ml-2 mt-16 inline-block w-2/5 rounded-full bg-cyan-400 p-4 text-center text-white no-underline hover:bg-cyan-300"
          >
            <b className={"text-xl tracking-widest hover:tracking-wide"}>PRIJAVA</b>
          </Link>
        </div>
      </div>
    </>
  );
}
