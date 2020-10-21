import React, { Suspense, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const Profile = loadable(() => import("./Profile/Profile"));
const AuthPage = loadable(() => import("../auth/AuthPage.js"));
const Explore = loadable(() => import("./Explore/Explore"));
const Overview = loadable(() => import("./Overview/Overview"));
const LayoutSplashScreen = loadable(() => import("../../../_metronic"));

export default function HomePage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/ " />
        <Route exact path="/ " component={Explore} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/profile" component={Profile} />

        <Route path="/overview">
          <Redirect exact from="/overview/" to="/overview/dashboard" />
          <Route exact path="/overview/" component={Overview} />
          <Route exact path="/overview/dashboard" component={Overview} />
          <Route exact path="/overview/wallet" component={Overview} />
          <Route exact path="/overview/transactions" component={Overview} />
          <Route exact path="/overview/settings" component={Overview} />
        </Route>

        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
