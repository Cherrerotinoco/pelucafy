import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import passwordValidation from "../../utils/validation/passwordValidation";
import { Elements } from "../../components/elements";
//
function FormPassword({ handleDataSubmit, buttonText }) {
  const { isSendingPasswordReset, passwordResetSent } =
    useSelector(authSelector);

  const { Button, Label, Input } = Elements;

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

  const handleChange = useCallback(
    (e) => {
      if (errorMsg[e.target.name] !== "") {
        setErrorMsg({ ...errorMsg, [e.target.name]: "" });
      }
      setPassword({ ...password, [e.target.name]: e.target.value });
    },
    [errorMsg, password],
  );

  return (
    <>
      <form
        className="w-full shadow-lg rounded-lg px-8 pt-4 pb-4 mb-4"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="oldPassword"> Old Password</Label>
        <Input
          type="password"
          name="oldPassword"
          value={password.oldPassword}
          onChange={handleChange}
        />

        {errorMsg.oldPassword ? errorMsg.oldPassword : null}

        <Label htmlFor="newPassword"> New Password</Label>
        <Input
          type="password"
          name="newPassword"
          value={password.newPassword}
          onChange={handleChange}
        />
        {errorMsg.newPassword ? errorMsg.newPassword : null}
        <Label htmlFor="newPassword2">Repeat New Password</Label>
        <Input
          type="password"
          name="newPassword2"
          value={password.newPassword2}
          onChange={handleChange}
        />
        {errorMsg.newPassword2 ? errorMsg.newPassword2 : null}
        {buttonText(isSendingPasswordReset, passwordResetSent)}

        <Button
          submit
          styles="background"
          disabled={isSendingPasswordReset || passwordResetSent}
        >
          {buttonText(isSendingPasswordReset, passwordResetSent)}
        </Button>
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
