import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Profile.scss";
import Header from "../../components/Header";
import { authSelector } from "../../redux/auth/auth-selectors";

import * as ROUTES from "../../routes";
import api from "../../api";
import * as auth from "../../services/auth";

function Profile() {
  const { isSigningUp, isAuthenticated, currentUser } =
    useSelector(authSelector);
  const [data, setData] = useState(currentUser);

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: false,
    errorMsg: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    updateUserData(formData);
  }

  async function updateUserData(userData) {
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
  }

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <main className="p-4">
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="form-label">
          firstName
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="form-input"
          value={data.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-input"
          value={data.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="form-input"
          name="email"
          value={data.email}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isSigningUp}
        >
          Save
        </button>
      </form>

      <div className="">
        {request.isDataError && request.errorMsg}
        {request.isDataPending && "Guardando datos"}
        {request.isDataSuccess && "Usuario guardado!"}
      </div>
    </main>
  );
}

export default Profile;
