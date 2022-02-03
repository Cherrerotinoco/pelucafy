import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import passwordValidation from "../../utils/validation/passwordValidation";
import Label from "../../components/elements/Label";

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
      <form
        className="w-full shadow-lg rounded-lg px-8 pt-4 pb-4 mb-4"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="oldPassword"> Old Password</Label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          id="oldPassword"
          name="oldPassword"
          value={password.oldPassword}
          onChange={handleChange}
          required
        />
        {errorMsg.oldPassword ? errorMsg.oldPassword : null}

        <Label htmlFor="newPassword"> New Password</Label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          id="newPassword"
          name="newPassword"
          value={password.newPassword}
          onChange={handleChange}
          required
        />
        {errorMsg.newPassword ? errorMsg.newPassword : null}
        <Label htmlFor="newPassword2">Repeat New Password</Label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          id="newPassword2"
          name="newPassword2"
          value={password.newPassword2}
          onChange={handleChange}
          required
        />
        {errorMsg.newPassword2 ? errorMsg.newPassword2 : null}
        <button
          type="submit"
          className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
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
