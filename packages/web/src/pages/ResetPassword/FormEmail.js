import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";

function FormEmail({ handleDataSubmit, buttonText }) {
  const { isSendingPasswordReset, passwordResetSent } =
    useSelector(authSelector);

  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleDataSubmit(email);
    setEmail("");
  }

  function handleChange(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="form-input"
          value={email}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSendingPasswordReset || passwordResetSent}
        >
          {buttonText(isSendingPasswordReset, passwordResetSent)}
        </button>
      </form>
    </>
  );
}

FormEmail.defaultProps = {
  handleDataSubmit: {},
  buttonText: "Send",
};
FormEmail.propTypes = {
  handleDataSubmit: PropTypes.func,
  buttonText: PropTypes.func,
};

export default FormEmail;
