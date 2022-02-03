import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./Login.scss";
import { FcGoogle } from "react-icons/fc";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";
import Title from "../../components/elements/Title";

function Login() {
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

    dispatch(signInWithEmailRequest(email, password, saveCredentials));

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
      <main className="Login">
        <section className="Login__wrapper">
          <Title weight="3" align="center">
            Login
          </Title>
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
              id="email"
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
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
              id="password"
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
              value={password}
              onChange={handleSetPassword}
            />
            <div className="block flex-grow lg:flex lg:items-center">
              <button
                className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
                type="submit"
                disabled={isSigningUp}
              >
                Login
              </button>
              <span className="form-label block text-blue-300 py-2 font-bold m-2">
                or
              </span>
              <button
                className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
                type="button"
                onClick={handleLoginWithGoogle}
                disabled={isSigningUp}
              >
                <FcGoogle />
              </button>
            </div>

            <div className="block flex-grow lg:flex lg:items-center">
              <input
                type="checkbox"
                className="m-2"
                id="saveCredentials"
                name="saveCredentials"
                checked={saveCredentials}
                onChange={(e) => setSaveCredentials(e.target.checked)}
              />
              <label
                htmlFor="saveCredentials"
                className="form-label block text-blue-300 py-2 font-bold mb-2"
              >
                Remember login?
              </label>
            </div>
          </form>
          {signUpError && (
            <section className="mt-4">{signUpError.payload}</section>
          )}
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="text-sky-50 underline hover:text-blue-300  w-full text-center block mb-2"
            >
              Forgot Password?
            </Link>
            <Link
              to={ROUTES.SIGN_UP}
              className="text-sky-50 underline hover:text-blue-300  w-full text-center block mb-2"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default Login;
