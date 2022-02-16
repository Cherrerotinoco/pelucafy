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

/**
 *  Profile Page rendered in the user control panel,  send data to the API & handle response
 * @returns  JSX Page with tailwind styled components
 */
function Profile() {
  const dispatch = useDispatch();

  const { isSigningUp, isAuthenticated, currentUser } =
    useSelector(authSelector);

  const { Button, Label, Input, ErrorMsg } = Elements;

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

  return (
    <>
      <section className="Profile p-4">
        <form
          className="
w-full  rounded-lg "
          onSubmit={handleSubmit}
        >
          <Label htmlFor="firstName"> Firs Name</Label>
          <Input name="firstName" value={firstName} onChange={handleChange} />
          {errorMessage.firstName && (
            <ErrorMsg>{errorMessage.firstName}</ErrorMsg>
          )}

          <Label htmlFor="lastName"> Last Name</Label>
          <Input name="lastName" value={lastName} onChange={handleChange} />

          {errorMessage.lastName && (
            <ErrorMsg>{errorMessage.lastName}</ErrorMsg>
          )}

          <Label htmlFor="email"> Email</Label>
          <Input name="email" value={email} onChange={handleChange} />

          {errorMessage.email && <ErrorMsg>{errorMessage.email}</ErrorMsg>}
          <div className="mt-5">
            <Button submit styles="light" disabled={isSigningUp}>
              Save
            </Button>
            <FileUploader callback={updateUserImage} />
          </div>
        </form>
        <Link
          to={ROUTES.RESET_PASSWORD}
          className="text-sky-50 underline hover:text-blue-300  w-full text-center block "
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
