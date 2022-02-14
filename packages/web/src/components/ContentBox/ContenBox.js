import React from "react";
import { Route, Switch } from "react-router-dom";

import * as ROUTES from "../../routes";

import Home from "../../pages/Home";
import AddSong from "../../pages/AddSong";
import MySongs from "../../pages/MySongs";
import Search from "../../pages/Search";

function ContentBox() {
  return (
    <>
      <Switch>
        <Route path={ROUTES.HOME} component={Home} exact />
        <Route path={ROUTES.ADDSONG} component={AddSong} exact />
        <Route path={ROUTES.MYSONGS} component={MySongs} exact />
        <Route path={ROUTES.SEARCH} component={Search} exact />
      </Switch>
    </>
  );
}

export default ContentBox;
