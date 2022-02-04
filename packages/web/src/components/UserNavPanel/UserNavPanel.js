import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { GoSettings } from "react-icons/go";
import { ImExit, ImStatsBars } from "react-icons/im";

import * as ROUTES from "../../routes";
import { signOut } from "../../redux/auth/auth-actions";
import ProfileImage from "../ProfileImage/ProfileImage";
import Title from "../elements/Title";
import Button from "../elements/Button";

const UserNavPanel = ({ handlerRenderedComponet }) => {
  const dispatch = useDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const [dropDown, setDropDown] = useState(false);
  return (
    <>
      <div className="w-full block items-center justify-end flex-grow lg:flex lg:items-center lg:w-auto ">
        {dropDown ? (
          <>
            <Button
              styles="noRing"
              onClick={() =>
                handlerRenderedComponet({ [ROUTES.PROFILE]: true })
              }
            >
              <GoSettings />
            </Button>
            <Button
              styles="noRing"
              onClick={() =>
                handlerRenderedComponet({
                  [ROUTES.RESET_PASSWORD]: true,
                })
              }
            >
              <ImStatsBars />
            </Button>
            <Button styles="noRing" onClick={handleSignOut}>
              <ImExit />
            </Button>
          </>
        ) : (
          <Title weight="3" align="center">
            SONGFY
          </Title>
        )}

        <Button styles="noRing" onClick={() => setDropDown(!dropDown)}>
          <ProfileImage thumbnail />
        </Button>
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
