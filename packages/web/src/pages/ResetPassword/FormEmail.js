import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import emailValidation from "../../utils/validation/emailValidation";

function FormEmail({ handleDataSubmit, buttonText }) {
  const { isSendingPasswordReset, passwordResetSent } =
    useSelector(authSelector);

  const history = useHistory();

  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" || emailValidation(email)) {
      handleDataSubmit(emailValidation(email));
      setEmail("");
      history.push("/");
    }
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
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={handleChange}
          required
        />
        {email === "" ? <span>Please, insert email</span> : null}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSendingPasswordReset || passwordResetSent || email === ""}
        >
          {buttonText(isSendingPasswordReset, passwordResetSent)}
        </button>
      </form>
    </>
  );
}

FormEmail.defaultProps = {
  handleDataSubmit: "",
  buttonText: "Send",
};
FormEmail.propTypes = {
  handleDataSubmit: PropTypes.func,
  buttonText: PropTypes.func,
};

export default FormEmail;
