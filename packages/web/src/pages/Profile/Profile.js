import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.scss";

import { authSelector } from "../../redux/auth/auth-selectors";

import * as ROUTES from "../../routes";
import api from "../../api";
import * as auth from "../../services/auth";

import FileUploader from "../../components/FileUploader";
import { syncSignIn } from "../../redux/auth/auth-actions";

import validateProfile from "./validateProfile";

function Profile() {
  const dispatch = useDispatch();

  const { isSigningUp, isAuthenticated, currentUser } =
    useSelector(authSelector);
  const [data, setData] = useState(currentUser);
  const { firstName, lastName, email } = data;

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: false,
  });
  const { isDataPending, isDataSuccess, isDataError } = request;

  const [errorMessage, setErrorMesage] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateProfile(data);
    setErrorMesage(errors);

    if (Object.keys(errors).length > 0) {
      setRequest({
        ...request,
        isDataError: true,
      });
      return;
    }

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    updateUserData(formData);
  }

  const updateUserData = async (userData) => {
    // Get token
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isDataError: true });
    }

    setRequest({ ...request, isDataPending: true });

    try {
      const response = await api.saveUserData(
        {
          Authorization: `Bearer ${token}`,
        },
        userData,
      );

      if (response.data.error) throw Error(response.errorMessage);

      dispatch(syncSignIn());
      setRequest({
        ...request,
        isDataPending: false,
        isDataSuccess: true,
        isDataError: false,
      });

      return null;
    } catch (error) {
      setRequest({ ...request, isDataError: true, errorMsg: error.message });
      return null;
    }
  };

  const updateUserImage = (error, result) => {
    if (!error && result && result.event === "success") {
      updateUserData({
        imageUrl: result.info.secure_url,
        thumbnailUrl: result.info.thumbnail_url,
      });
    }
  };

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (!isDataPending && isDataSuccess && !isDataError) {
    // return <Redirect to={ROUTES.PROFILE} />;
  }

  return (
    <>
      <section className="Profile p-4">
        <h2 className=" text-2xl md:text-2xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
          Profile
        </h2>
        <form
          className="
w-full shadow-lg rounded-lg px-8 pt-4 pb-4 mb-4"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="firstName"
            className="form-label block text-blue-300 py-2 font-bold mb-2"
          >
            firstName
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            value={firstName}
            onChange={handleChange}
          />
          {errorMessage.firstName && <div>{errorMessage.firstName}</div>}

          <label
            htmlFor="lastName"
            className="form-label block text-blue-300 py-2 font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          {errorMessage.lastName && <div>{errorMessage.lastName}</div>}

          <label
            htmlFor="email"
            className="form-label block text-blue-300 py-2 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errorMessage.email && <div>{errorMessage.email}</div>}

          <button
            className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
            type="submit"
            disabled={isSigningUp}
          >
            Save
          </button>
          <FileUploader callback={updateUserImage} />
        </form>
        <hr className="mt-1 mb-4" />
        <Link
          to={ROUTES.RESET_PASSWORD}
          className="text-sky-50 underline hover:text-blue-300  w-full text-center block mb-2"
        >
          Change Password
        </Link>

        <div className="text-sky-50  w-full text-center block mb-2">
          {isDataError && "Los datos insertados no son validos"}
          {isDataPending && "Guardando datos"}
          {isDataSuccess && "Usuario guardado!"}
        </div>
      </section>
    </>
  );
}

export default Profile;
