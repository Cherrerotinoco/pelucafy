import * as Yup from "yup";

export const validationSchema = {
  login: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password must have between 6 and 12 characteres")
      .min(6)
      .max(12),
  }),
};

export const initialValues = {
  login: {
    email: "",
    password: "",
  },
};
