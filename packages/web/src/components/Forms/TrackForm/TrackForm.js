import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const TrackForm = () => {
  const [fromSubmiting, setFormSubmiting] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          genre: "",
        }}
        validate={(values) => {
          const errores = {};

          // Validacion title
          if (!values.title) {
            errores.title = "Title is required";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.title)) {
            errores.title = "Only letters and spaces";
          }

          // Validacion genre
          if (!values.genre) {
            errores.genre = "Genre is required";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.genre)) {
            errores.genre = "Only letters and spaces";
          }

          return errores;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          console.log("Formulario Submited");
          setFormSubmiting(true);
          setTimeout(() => setFormSubmiting(false), 5000);
        }}
      >
        {({ errors }) => (
          <Form
            className="
w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <div>
              <label
                className="form-label block text-blue-300 py-2 font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <Field
                className="form-input"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
              />
              <ErrorMessage
                name="title"
                component={() => <div className="error">{errors.title}</div>}
              />
            </div>
            <div>
              <label
                className="form-label block text-blue-300 py-2 font-bold mb-2"
                htmlFor="genre"
              >
                Genre
              </label>
              <Field
                className="form-input"
                type="text"
                id="genre"
                name="genre"
                placeholder="Genre"
              />
              <ErrorMessage
                name="genre"
                component={() => <div className="error">{errors.genre}</div>}
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
            >
              Submit
            </button>
            {fromSubmiting && <p className="exito">Form submitted</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TrackForm;
