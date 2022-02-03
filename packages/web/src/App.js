import React, { useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Particles from "react-tsparticles";
import particlesOptions from "./particles.json";

import "./styles/App.scss";

import Header from "./components/Header";

import UserBox from "./components/UserBox";
import ContentBox from "./components/ContentBox";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import { authSelector } from "./redux/auth/auth-selectors";

function App() {
  const dispatch = useDispatch();
  const { saveCredentials, isAuthenticated } = useSelector(authSelector);

  const history = useHistory();

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

  /*
  useEffect(() => {
        if (!saveCredentials) window.indexedDB.deleteDatabase('firebaseLocalStorageDb')
  }, [saveCredentials])
  */
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  });

  return (
    <div className="App__container">
      <Particles options={particlesOptions} />

      <div className="flex h-screen mb-4">
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
