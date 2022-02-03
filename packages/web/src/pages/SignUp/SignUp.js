import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./SignUp.scss";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";
import Title from "../../components/elements/Title";
import Label from "../../components/elements/Label";
import Input from "../../components/elements/Input";

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

  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="SignUp">
        <section className="Login__wrapper">
          <Title weight="2" align="center">
            SignUp
          </Title>

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
            <Label htmlFor="email"> Email</Label>
            <Input name="email" value={email} action={handleSetEmail} />

            <Label htmlFor="password"> Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              action={handleSetPassword}
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
              className="shadow appearance-none border rounded "
              id="saveCredentials"
              name="saveCredentials"
              checked={saveCredentials}
              onChange={(e) => setSaveCredentials(e.target.checked)}
            />
            <Label htmlFor="saveCredentials"> Remember login?</Label>
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
