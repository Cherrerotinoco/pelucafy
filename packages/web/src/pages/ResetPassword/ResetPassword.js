import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ResetPassword.scss";

import Header from "../../components/Header";
import FormPassword from "./FormPassword";
import FormEmail from "./FormEmail";

import {
  sendPasswordResetEmail,
  resetAuthState,
  sendPasswordResetPassword,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

function ResetPassword() {
  const dispatch = useDispatch();
  const { passwordResetError, isAuthenticated } = useSelector(authSelector);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const handleDataSubmit = useCallback(
    (formData) => {
      isAuthenticated
        ? dispatch(sendPasswordResetPassword(formData))
        : dispatch(sendPasswordResetEmail(formData));
    },
    [dispatch, isAuthenticated],
  );
  const button = useCallback(
    (loading, sent) => {
      if (loading) {
        return "Sending...";
      }

      if (sent) {
        return isAuthenticated ? "New password sent!" : "Email sent!";
      }

      return isAuthenticated
        ? "Send new password"
        : "Send password reset email";
    },
    [isAuthenticated],
  );

  return (
    <>
      <main className="ResetPassword">
        <section className="Login__wrapper">
          <h2
            className="my-4 text-3xl md:text-3xl
 text-white opacity-75 font-bold leading-tight text-center md:text-left"
          >
            {isAuthenticated ? "Password Reset" : "Forgot my password"}
          </h2>

          <hr className="my-4" />

          {isAuthenticated ? (
            <FormPassword
              handleDataSubmit={handleDataSubmit}
              buttonText={button}
            />
          ) : (
            <FormEmail
              handleDataSubmit={handleDataSubmit}
              buttonText={button}
            />
          )}
        </section>
        {passwordResetError && (
          <section className="mt-4">{passwordResetError}</section>
        )}
      </main>
    </>
  );
}

export default ResetPassword;
