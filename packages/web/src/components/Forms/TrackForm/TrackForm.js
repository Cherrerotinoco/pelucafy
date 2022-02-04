import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Label from "../../elements/Label";
import Button from "../../elements/Button";

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
              <Label htmlFor="title"> Title</Label>
              <Field
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
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
              <Label htmlFor="genre"> Genre</Label>
              <Field
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
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

            <Button submit styles="background">
              Submit
            </Button>

            {fromSubmiting && <p className="exito">Form submitted</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TrackForm;
