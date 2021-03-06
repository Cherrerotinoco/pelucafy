import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import emailValidation from "../../utils/validation/emailValidation";
import { Elements } from "../../components/elements";

/**
 * Form for send email to refresh password
 * @param {} param {handleDataSubmit={parent prop that manage submit}, buttonText={parent prop that set button text}}
 * @returns Form with styled components in Tailwind
 */
function FormEmail({ handleDataSubmit, buttonText }) {
  const { isSendingPasswordReset, passwordResetSent } =
    useSelector(authSelector);

  const { Button, Label, Input } = Elements;

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
  const handleChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  return (
    <>
      <form
        className="
w-full  rounded-lg px-8 pt-4 pb-4 mb-4"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="email"> Email</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <div>
          {email === "" ? (
            <span className=" text-blue-300 py-2 font-bold mb-2">
              Please, insert email
            </span>
          ) : null}
        </div>

        <Button
          submit
          styles="light"
          disabled={isSendingPasswordReset || passwordResetSent || email === ""}
        >
          {buttonText(isSendingPasswordReset, passwordResetSent)}
        </Button>
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
