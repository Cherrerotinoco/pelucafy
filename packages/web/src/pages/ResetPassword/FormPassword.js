import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import passwordValidation from "../../utils/validation/passwordValidation";

function FormPassword({ handleDataSubmit, buttonText }) {
  const { isSendingPasswordReset, passwordResetSent } =
    useSelector(authSelector);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  const [errorMsg, setErrorMsg] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const validateInput = passwordValidation(password);
    if (Object.keys(validateInput).length !== 0) {
      setErrorMsg(validateInput);
    } else {
      handleDataSubmit(password);
      setPassword({
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      });
    }
  }

  function handleChange(e) {
    if (errorMsg[e.target.name] !== "") {
      setErrorMsg({ ...errorMsg, [e.target.name]: "" });
    }
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword" className="form-label">
          Old Password
        </label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          className="form-input"
          value={password.oldPassword}
          onChange={handleChange}
          required
        />
        {errorMsg.oldPassword ? errorMsg.oldPassword : null}
        <label htmlFor="newPassword" className="form-label">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="form-input"
          value={password.newPassword}
          onChange={handleChange}
          required
        />
        {errorMsg.newPassword ? errorMsg.newPassword : null}
        <label htmlFor="newPassword2" className="form-label">
          Repeat New Password
        </label>
        <input
          type="password"
          id="newPassword2"
          name="newPassword2"
          className="form-input"
          value={password.newPassword2}
          onChange={handleChange}
          required
        />
        {errorMsg.newPassword2 ? errorMsg.newPassword2 : null}
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
