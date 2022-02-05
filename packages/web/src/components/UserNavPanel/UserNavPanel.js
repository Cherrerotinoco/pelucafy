import React, { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { GoSettings } from "react-icons/go";

import { ImPlay2, ImExit, ImStatsBars } from "react-icons/im"; // GiSoundWaves
import { useLocation } from "react-router-dom";
import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import ProfileImage from "../ProfileImage/ProfileImage";
import Title from "../elements/Title";
import Button from "../elements/Button";

const UserNavPanel = ({ handlerRenderedComponet }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === ROUTES.RESET_PASSWORD) {
      handlerRenderedComponet({
        [ROUTES.RESET_PASSWORD]: true,
      });
      setTitle("New Pasword");
      setDropDown(false);
    }
  }, [location.pathname, handlerRenderedComponet]);

  const [dropDown, setDropDown] = useState(false);
  const [title, setTitle] = useState("Playing");
  return (
    <>
      <div className="w-full block items-center justify-end flex-grow lg:flex lg:items-center lg:w-auto ">
        {dropDown ? (
          <>
            <Button
              styles="noRing"
              onClick={() => {
                handlerRenderedComponet({
                  [ROUTES.NOWPLAYING]: true,
                });
                setTitle("Playing");
                setDropDown(false);
              }}
            >
              <ImPlay2 />
            </Button>
            <Button
              styles="noRing"
              onClick={() => {
                handlerRenderedComponet({
                  [ROUTES.PROFILE]: true,
                });
                setTitle("Profile");
                setDropDown(false);
              }}
            >
              <GoSettings />
            </Button>
            <Button
              styles="noRing"
              onClick={() => {
                handlerRenderedComponet({
                  [ROUTES.STATS]: true,
                });
                setTitle("Stats");
                setDropDown(false);
              }}
            >
              <ImStatsBars />
            </Button>
            <Button styles="noRing" onClick={handleSignOut}>
              <ImExit />
            </Button>
          </>
        ) : (
          <Title weight="2" align="center">
            {title}
          </Title>
        )}

        <Button styles="noRing" onClick={() => setDropDown(!dropDown)}>
          <ProfileImage thumbnail />
        </Button>
      </div>
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
