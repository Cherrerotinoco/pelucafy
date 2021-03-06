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

import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

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

  return (
    <div className="App__container">
      <Particles options={particlesOptions} />

      <div className="w-full flex-grow lg:flex  lg:w-auto m-2">
        <div className="w-25">
          <Header />
        </div>

        <div className="flex-auto  lg:w-auto m-4 scrollable overflow-y-auto">
          <div className="mt-10">
            <ContentBox />
          </div>
        </div>
        <div className="flex-initial basis-2 w-auto lg:items-center m-2">
          <UserBox />
        </div>
      </div>

      <Modal />
    </div>
  );
}

export default App;
