import React, { useCallback, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";

import * as ROUTES from "../../routes";

import UserNavPanel from "../UserNavPanel";
import Player from "../Player";
import Card from "../elements/Card";

import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import NowPlaying from "../../pages/NowPlaying/NowPlaying";
import UserStats from "../../pages/UserStats";

function UserBox() {
  const { isAuthenticated } = useSelector(authSelector);

  const [renderedComponent, setRenderedComponent] = useState({
    [ROUTES.NOWPLAYING]: true,
    [ROUTES.PROFILE]: false,
    [ROUTES.RESET_PASSWORD]: false,
    [ROUTES.STATS]: false,
  });

  const handlerRenderedComponet = useCallback(
    (componentRended) => {
      setRenderedComponent(componentRended);
    },
    [setRenderedComponent],
  );

  return (
    <>
      {isAuthenticated && (
        <div className="place-content-center ">
          <Card>
            <div className="userNavBar">
              <UserNavPanel handlerRenderedComponet={handlerRenderedComponet} />
            </div>

            <hr className="mt-1 mb-4 " />
            <div className="userBoxContent">
              {renderedComponent[ROUTES.PROFILE] && <Profile />}
              {renderedComponent[ROUTES.RESET_PASSWORD] && <ResetPassword />}
              {renderedComponent[ROUTES.NOWPLAYING] && <NowPlaying />}
              {renderedComponent[ROUTES.STATS] && <UserStats />}
            </div>
            <hr className="mt-4 mb-1" />
            <Player />
          </Card>
        </div>
      )}

      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </>
  );
}

export default UserBox;
