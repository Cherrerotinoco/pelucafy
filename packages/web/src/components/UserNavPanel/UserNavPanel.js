import React, { useState } from "react";

import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { GoSettings } from "react-icons/go";
import { ImExit, ImStatsBars } from "react-icons/im";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import ProfileImage from "../ProfileImage/ProfileImage";
import Title from "../elements/Title";

const UserNavPanel = ({ handlerRenderedComponet }) => {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  const [dropDown, setDropDown] = useState(false);
  return (
    <>
      <div className="w-full block items-center justify-end flex-grow lg:flex lg:items-center lg:w-auto m-5">
        {dropDown ? (
          <>
            <button
              className="text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
              type="button"
              onClick={() =>
                handlerRenderedComponet({ [ROUTES.PROFILE]: true })
              }
            >
              <GoSettings />
              {/* <NavLink to={ROUTES.PROFILE}>
                <GoSettings />
              </NavLink> */}
            </button>
            <button
              className="text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
              type="button"
              onClick={() =>
                handlerRenderedComponet({
                  [ROUTES.RESET_PASSWORD]: true,
                })
              }
            >
              <ImStatsBars />
              {/* <NavLink to={ROUTES.RESET_PASSWORD}>
                <ImStatsBars />
              </NavLink> */}
            </button>
            <button
              className="text-white text-2xl font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-1"
              type="button"
              onClick={handleSignOut}
            >
              <ImExit />
            </button>
          </>
        ) : (
          <Title weight="3" align="center">
            SONGFY
          </Title>
        )}

        <button
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"
          type="button"
          onClick={() => setDropDown(!dropDown)}
        >
          <ProfileImage thumbnail />
        </button>
      </div>
      <hr className="mt-1 mb-4" />
    </>
  );
};

UserNavPanel.defaultProps = {
  handlerRenderedComponet: "",
};
UserNavPanel.propTypes = {
  handlerRenderedComponet: PropTypes.func,
};

export default UserNavPanel;
