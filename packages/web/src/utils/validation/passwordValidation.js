export function passwordValidation(passwords) {
  const errorMessage = {};

  Object.entries(passwords).map(([key, value]) => {
    if (value === "") {
      errorMessage[key] = "Please, insert value";
    } else if (value !== validatePassword(value)) {
      errorMessage[key] =
        "Password must have: minimum eight characters, at least one letter and one number";
    } else if (key === "newPassword2" && value !== passwords.newPassword) {
      errorMessage[key] = "Passwords do not match";
    }
    return errorMessage;
  });

  return errorMessage;
}

const validatePassword = (password) => {
  try {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)[0];
  } catch (error) {
    return false;
  }
};

export default passwordValidation;
