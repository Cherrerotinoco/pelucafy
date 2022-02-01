import React from "react";
import { string, object, func, oneOfType } from "prop-types";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  validationSchema,
  initialValues,
} from "../../../utils/validation/validationSchema";

function LoginForm({ id, onSubmit, loginError }) {
  return (
    <Formik
      initialValues={initialValues.login}
      onSubmit={(valores, { resetForm }) => {
        resetForm();
      }}
    >
      {(formikProps) => (
        <Form
          acceptCharset="utf-8"
          autoComplete="off"
          onSubmit={formikProps.handleSubmit}
        >
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Field
            type="text"
            id="login-email"
            className="form-input"
            name="email"
            title="Email"
            placeholder="Enter email"
          />
          <ErrorMessage
            name="email"
            component={() => <div className="error">{errors.email}</div>}
          />

          <Field
            type="password"
            id="login-password"
            name="password"
            title="Password"
            placeholder="Enter password"
          />
          {loginError && <section className="mt-4">{loginError}</section>}
          <button
            type="submit"
            disabled={formikProps.isSubmitting}
            classes="btn btn-primary w-full"
          >
            Log in
          </button>
        </Form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  id: string.isRequired,
  onSubmit: func,
  loginError: oneOfType([string, object]),
};

LoginForm.defaultProps = {
  onSubmit: () => {},
  loginError: null,
};

export default LoginForm;
