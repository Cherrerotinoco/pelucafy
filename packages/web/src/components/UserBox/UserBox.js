import React, { useCallback, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";

import * as ROUTES from "../../routes";

import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";
import UserNavPanel from "../UserNavPanel";

function UserBox() {
  const { isAuthenticated } = useSelector(authSelector);
  const [renderedComponent, setRenderedComponent] = useState({
    [ROUTES.PROFILE]: false,
    [ROUTES.RESET_PASSWORD]: false,
  });

  const handlerRenderedComponet = useCallback(
    (componetReded) => {
      setRenderedComponent(componetReded);
    },
    [setRenderedComponent],
  );

  return (
    <>
      {isAuthenticated && (
        <UserNavPanel handlerRenderedComponet={handlerRenderedComponet} />
      )}
      {renderedComponent[ROUTES.PROFILE] && <Profile />}
      {renderedComponent[ROUTES.RESET_PASSWORD] && <ResetPassword />}
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </>
  );
}

export default UserBox;
