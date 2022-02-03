import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { GoSettings } from "react-icons/go";
import { ImExit, ImStatsBars } from "react-icons/im";

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
        className="text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
        type="button"
      >
        <NavLink to={ROUTES.PROFILE}>
          <GoSettings />
        </NavLink>
      </button>
      <button
        className="text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
        type="button"
      >
        <NavLink to={ROUTES.RESET_PASSWORD}>
          <ImStatsBars />
        </NavLink>
      </button>
      <button
        className="text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
        type="button"
        onClick={handleSignOut}
      >
        <ImExit />
      </button>
    </>
  );
}

export default ThumbnailDropDown;
