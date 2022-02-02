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
          type="email"
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          id="email"
          className="form-input"
          value={email}
          onChange={handleChange}
          required
        />
        <div>
          {email === "" ? (
            <span className=" text-blue-300 py-2 font-bold mb-2">
              Please, insert email
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
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
