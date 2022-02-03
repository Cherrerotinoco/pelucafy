import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

import LogoHome from "../LogoHome/LogoHome";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <header className="p-4">
      {!isAuthenticated && (
        <>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <h1
              className="m-4 text-2xl md:text-4xl
 text-white opacity-75 font-bold leading-tight text-center md:text-left"
            >
              456 users{" "}
            </h1>
            <h1
              className="m-4 text-2xl md:text-4xl
 text-white opacity-75 font-bold leading-tight text-center md:text-left"
            >
              1739 songs{" "}
            </h1>

            <h1
              className="m-4 text-2xl md:text-4xl
 text-white opacity-75 font-bold leading-tight text-center md:text-left"
            >
              149 playlist{" "}
            </h1>
          </div>
        </>
      )}

      {isAuthenticated && (
        <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <button
              className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
              type="button"
            >
              <NavLink to={ROUTES.MYSONGS}>My songs</NavLink>
            </button>
            <button
              className="bg-gradient-to-r from-gray-900 to-sky-300 hover:from-sky-300 hover:to-gray-900
 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
              type="button"
            >
              <NavLink to={ROUTES.ADDSONG}>Add song</NavLink>
            </button>
          </div>
        </nav>
      )}
      {!isAuthenticated && <LogoHome />}
    </header>
  );
}

export default Header;
