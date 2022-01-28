import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";

function FormPassword({ handleDataSubmit, buttonText }) {
  const { isSendingPasswordReset, passwordResetSent } =
    useSelector(authSelector);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleDataSubmit(password);
    setPassword({
      oldPassword: "",
      newPassword: "",
    });
  }

  function handleChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          Old Password
        </label>
        <input
          type="text"
          id="oldPassword"
          name="oldPassword"
          className="form-input"
          value={password.oldPassword}
          onChange={handleChange}
        />
        <label htmlFor="email" className="form-label">
          New Password
        </label>
        <input
          type="text"
          id="newPassword"
          name="newPassword"
          className="form-input"
          value={password.newPassword}
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

FormPassword.defaultProps = {
  handleDataSubmit: {},
  buttonText: "Send",
};
FormPassword.propTypes = {
  handleDataSubmit: PropTypes.func,
  buttonText: PropTypes.func,
};

export default FormPassword;
