import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const Settings = loadable(() => import("./Settings/Settings"));
const AuthPage = loadable(() => import("../auth/AuthPage.js"));
const LayoutSplashScreen = loadable(() => import("../../../_metronic"));
const Dashboard = loadable(() => import("./Dashboard/dashboard"));
const Transactions = loadable(() => import("./Transctions/transctions"));
const Wallet = loadable(() => import("./Wallet/wallet"));
const Tokens = loadable(() => import("./Tokens/tokensPage"));

export default function HomePage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/settings" component={Settings} />
        <Route path="/tokens" component={Tokens} />
        <Route path="/auth" component={AuthPage} />

        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}