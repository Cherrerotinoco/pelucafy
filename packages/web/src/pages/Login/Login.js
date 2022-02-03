import React, { useCallback, useEffect, useState } from "react";
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
import Label from "../../components/elements/Label";
import Input from "../../components/elements/Input";
import Button from "../../components/elements/Button";

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

  const handleLoginWithGoogle = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signUpWithGoogleRequest(saveCredentials));
    },
    [dispatch, saveCredentials],
  );

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signInWithEmailRequest(email, password, saveCredentials));

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
            <Label htmlFor="email"> Genre</Label>
            <Input name="email" value={email} action={handleSetEmail} />

            <Label htmlFor="password"> Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              action={handleSetPassword}
            />

            <div className="block flex-grow lg:flex lg:items-center">
              <Button
                submit="true"
                styles="background"
                action={{ isSigningUp }}
              >
                Login
              </Button>

              <Label> or</Label>

              <Button
                submit={false}
                styles="background"
                action={handleLoginWithGoogle}
                disabled={isSigningUp}
              >
                <FcGoogle />
              </Button>
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
              <Label htmlFor="saveCredentials"> Remember login?</Label>
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
