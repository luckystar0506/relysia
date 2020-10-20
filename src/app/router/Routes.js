import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import { LayoutContextProvider } from "../../_metronic";
import Layout from "../../_metronic/layout/Layout";
import * as routerHelpers from "../router/RouterHelpers";
import { SnackbarProvider } from "notistack";
import { connect } from "react-redux";
import loadable from "@loadable/component";
import firebase from "firebase/app";
import "firebase/auth";
import { updateUserData } from "../store/ducks/auth.duck";

const ErrorsPage = loadable(() => import("../pages/errors/ErrorsPage"));
const HomePage = loadable(() => import("../pages/home/HomePage"));

const Routes = withRouter(({ history, updateUserData }) => {
  let user = null;

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUserData(user);
      }
    });
  }, []);

  const lastLocation = useLastLocation();
  routerHelpers.saveLastLocation(lastLocation);
  const { menuConfig, userLastLocation } = useSelector(
    ({ auth, urls, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: user != null,
      userLastLocation: routerHelpers.getLastLocation(),
    }),
    shallowEqual
  );

  return (
    <SnackbarProvider
      maxSnack={6}
      //   anchorOrigin={{
      //     vertical: "top",
      //     horizontal: "left",
      //   }}
    >
      <LayoutContextProvider history={history} menuConfig={menuConfig}>
        <Switch>
          <Route path="/error" component={ErrorsPage} />
          <Layout>
            <HomePage history={history} userLastLocation={userLastLocation} />
          </Layout>
        </Switch>
      </LayoutContextProvider>
    </SnackbarProvider>
  );
});

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps, { updateUserData })(Routes);
