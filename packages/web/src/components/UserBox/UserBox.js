import React from "react";
import { Switch, Route } from "react-router-dom";

import * as ROUTES from "../../routes";

import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import ResetPassword from "../../pages/ResetPassword";
import Profile from "../../pages/Profile";

function UserBox() {
  return (
    <>
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
      </Switch>
    </>
  );
}

export default UserBox;
