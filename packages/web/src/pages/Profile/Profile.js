import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Profile.scss";
import Header from "../../components/Header";
import { profileSelector } from "../../redux/profile/profile-selectors";
import { authSelector } from "../../redux/auth/auth-selectors";
import {
  updateUserProfile,
  getUserProfileData,
} from "../../redux/profile/profile-actions";

import * as ROUTES from "../../routes";

function Profile() {
  const dispatch = useDispatch();
  const { isSigningUp, isAuthenticated } = useSelector(authSelector);
  const { firstName, lastName, email } = useSelector(profileSelector);

  useEffect(() => {
    dispatch(getUserProfileData());
  }, [dispatch]);

  const [data, setData] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    dispatch(updateUserProfile(formData));
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
          value={firstName}
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
          value={lastName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="form-input"
          value={email}
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
    </main>
  );
}

export default Profile;
