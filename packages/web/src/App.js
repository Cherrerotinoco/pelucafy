import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles/App.scss";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import AddSong from "./pages/AddSong";
import MySongs from "./pages/MySongs";
import { authSelector } from "./redux/auth/auth-selectors";

function App() {
  const dispatch = useDispatch();
  const {saveCredentials} = useSelector(authSelector)

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(syncSignIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch]);

  useEffect(() => {
        if (!saveCredentials) window.indexedDB.deleteDatabase('firebaseLocalStorageDb')
  }, [saveCredentials])

  return (
    <div className="App__container">
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES.HOME} component={Home} exact />
        <Route path={ROUTES.ADDSONG} component={AddSong} exact />
        <Route path={ROUTES.MYSONGS} component={MySongs} exact />
      </Switch>
    </div>
  );
}

export default App;
