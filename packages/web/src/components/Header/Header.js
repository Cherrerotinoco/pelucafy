import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

import ThumbnailDropDown from "../thumbnailDropDown/ThumbnailDropDown";
import ProfileImage from "../ProfileImage/ProfileImage";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  function handleSignOut() {
    dispatch(signOut());
  }

  const [dropDown, setDropDown] = useState(false);

  return (
    <header className="p-4">
      <nav className="flex items-center justify-between flex-wrap bg-teal p-6">
        <div className="flex items-center flex-no-shrink text-white mr-6">
          <NavLink to={ROUTES.HOME}>
            <img src="/images/logo.png" width="100" />
          </NavLink>
        </div>

        {!isAuthenticated && (
          <>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <button
                type="button"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
              >
                <NavLink to={ROUTES.LOGIN}>Login</NavLink>
              </button>
            </div>
          </>
        )}

        {isAuthenticated && (
          <>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
              <button
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                type="button"
              >
                <NavLink to={ROUTES.MYSONGS}>My songs</NavLink>
              </button>
              <button
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
                type="button"
              >
                <NavLink to={ROUTES.ADDSONG}>Add song</NavLink>
              </button>
            </div>

            {dropDown ? <ThumbnailDropDown /> : null}
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
              type="button"
              onClick={() => setDropDown(!dropDown)}
            >
              <ProfileImage thumbnail />
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
