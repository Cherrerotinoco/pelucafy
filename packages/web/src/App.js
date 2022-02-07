import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Particles from "react-tsparticles";
import particlesOptions from "./particles.json";
import * as ROUTES from "./routes";

import "./styles/App.scss";

import Header from "./components/Header";

import UserBox from "./components/UserBox";
import ContentBox from "./components/ContentBox";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import { authSelector } from "./redux/auth/auth-selectors";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, saveCredentials } = useSelector(authSelector);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      if (location.pathname !== ROUTES.SIGN_UP) {
        history.push("/login");
      }
    }
  }, [history, location.pathname, isAuthenticated]);

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

  // useEffect(() => {
  //   if (!saveCredentials)
  //     window.indexedDB.deleteDatabase("firebaseLocalStorageDb");
  // }, [saveCredentials]);

  return (
    <div className="App__container">
      <Particles options={particlesOptions} />

      <div className="flex h-screen m-4">
        <div className="flex-auto w-3/4">
          <Header />
          <ContentBox />
        </div>
        <div className="flex-auto w-1/4">
          <UserBox />
        </div>
      </div>
    </div>
  );
}

export default App;
