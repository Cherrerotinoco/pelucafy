import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./Login.scss";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } =
    useSelector(authSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveCredentials, setSaveCredentials] = useState(false)

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest( saveCredentials));
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signInWithEmailRequest(email, password,  saveCredentials));

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
      <main className="Login">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <hr className="my-4" />
          <button
            className="btn btn-primary w-full"
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            Login with Google
          </button>
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-input"
              value={email}
              onChange={handleSetEmail}
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
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
              Login
            </button>

            <input type="checkbox" id="saveCredentials" name="saveCredentials" checked={saveCredentials} onChange={(e) => setSaveCredentials(e.target.checked)} />
            <label htmlFor="saveCredentials">Remember login?</label>

          </form>
          {signUpError && (
            <section className="mt-4">{signUpError.payload}</section>
          )}
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="underline text-blue-gray-200 w-full text-center block mb-2"
            >
              Forgot Password?
            </Link>
            <Link
              to={ROUTES.SIGN_UP}
              className="underline text-blue-gray-200 w-full text-center block"
            >
              Don&apos;t have an account? Sign in
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default Login;
