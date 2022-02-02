import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./SignUp.scss";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } =
    useSelector(authSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveCredentials, setSaveCredentials] = useState(false);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest(saveCredentials));
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signUpWithEmailRequest(email, password, saveCredentials));

    setEmail("");
    setPassword("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <Header />
      <main className="SignUp">
        <section className="Login__wrapper">
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            SignUp
          </h1>
          <hr className="my-4" />
          <button
            className="btn btn-primary w-full"
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            SignUp with Google
          </button>
          <hr className="mt-1 mb-4" />
          <form
            className="
w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="email"
              className="form-label block text-blue-300 py-2 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              id="email"
              className="form-input"
              value={email}
              onChange={handleSetEmail}
            />
            <label
              htmlFor="password"
              className="form-label block text-blue-300 py-2 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              id="password"
              className="form-input"
              value={password}
              onChange={handleSetPassword}
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              Sign Up
            </button>

            <input
              type="checkbox"
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              id="saveCredentials"
              name="saveCredentials"
              checked={saveCredentials}
              onChange={(e) => setSaveCredentials(e.target.checked)}
            />
            <label
              className="form-label block text-blue-300 py-2 font-bold mb-2"
              htmlFor="saveCredentials"
            >
              Remember login?
            </label>
          </form>

          {signUpError && (
            <section className="mt-4">{signUpError.payload}</section>
          )}

          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link
              to={ROUTES.LOGIN}
              className="text-sky-50 underline hover:text-blue-300  w-full text-center block mb-2"
            >
              Have an account? Log in
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default SignUp;
