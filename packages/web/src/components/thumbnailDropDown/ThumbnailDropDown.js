import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";

function ThumbnailDropDown() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
      <button
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
        type="button"
      >
        <NavLink to={ROUTES.PROFILE}>⚙</NavLink>
      </button>
      <button
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
        type="button"
      >
        <NavLink to={ROUTES.RESET_PASSWORD}>🗝</NavLink>
      </button>
      <button
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
        type="button"
        onClick={handleSignOut}
      >
        💀
      </button>
    </>
  );
}

export default ThumbnailDropDown;
