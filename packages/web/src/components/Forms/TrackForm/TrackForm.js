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
          <Form className="formulario">
            <div>
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <Field
                className="form-input"
                type="text"
                id="title"
                name="title"
                placeholder="John Doe"
              />
              <ErrorMessage
                name="title"
                component={() => <div className="error">{errors.title}</div>}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="genre">
                Genre
              </label>
              <Field
                className="form-input"
                type="text"
                id="genre"
                name="genre"
                placeholder="genre@genre.com"
              />
              <ErrorMessage
                name="genre"
                component={() => <div className="error">{errors.genre}</div>}
              />
            </div>

            {/* <div>
              <Field name="pais" as="select">
                <option value="mexico">Mexico</option>
                <option value="España">España</option>
                <option value="Argentina">Argentina</option>
              </Field>
            </div>

            <div>
              <label htmlFor="sexo">
                <Field type="radio" name="sexo" value="hombre" /> Hombre
              </label>
              <label htmlFor="sexo">
                <Field type="radio" name="sexo" value="mujer" /> Mujer
              </label>
            </div> */}

            {/* <div>
              <Field name="mensaje" as="textarea" placeholder="Mensaje" />
            </div> */}

            <button type="submit" className="btn btn-primary w-full">
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
