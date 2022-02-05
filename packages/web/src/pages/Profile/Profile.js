import React, { useCallback, useState } from "react";
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
import { Elements } from "../../components/elements";

function Profile() {
  const dispatch = useDispatch();

  const { isSigningUp, isAuthenticated, currentUser } =
    useSelector(authSelector);

  const { Button, Title, Label, Input } = Elements;

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

  const handleChange = useCallback(
    (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    },
    [data],
  );

  if (!isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  if (!isDataPending && isDataSuccess && !isDataError) {
    // return <Redirect to={ROUTES.PROFILE} />;
  }

  return (
    <>
      <section className="Profile p-4">
        <form
          className="
w-full  rounded-lg px-8 pt-4 pb-4 mb-4"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="firstName"> Firs Name</Label>
          <Input name="firstName" value={firstName} onChange={handleChange} />
          {errorMessage.firstName && <div>{errorMessage.firstName}</div>}

          <Label htmlFor="lastName"> Last Name</Label>
          <Input name="lastName" value={lastName} onChange={handleChange} />

          {errorMessage.lastName && <div>{errorMessage.lastName}</div>}

          <Label htmlFor="email"> Email</Label>
          <Input name="email" value={email} onChange={handleChange} />

          {errorMessage.email && <div>{errorMessage.email}</div>}
          <Button submit styles="light" disabled={isSigningUp}>
            Save
          </Button>
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
