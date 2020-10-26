import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useTheme } from "@material-ui/core/styles";

export default function AuthPage() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="kt-grid kt-grid--ver kt-grid--root" style={{ height: "100% !important", minHeight: "100vh" }}>
      <div id="kt_login" className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1">
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
          <div
            className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-1.jpg")})`,
            }}
          >
            <div className="kt-grid__item"></div>
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
              <div className="kt-grid__item kt-grid__item--middle" style={{ padding: 15, height: 110 }}>
                <h3 className="kt-login__title">Welcome to Wallet!</h3>
                <h4 className="kt-login__subtitle">Learn to code on Bitcoin SV with our interactive platform!</h4>
              </div>
            </div>
            <div className="kt-grid__item">
              <div className="kt-login__info">
                <div className="kt-login__menu"></div>
              </div>
            </div>
          </div>

          <div
            className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper"
            style={{ paddingTop: matchesSM ? 0 : "6%" }}
          >
            <Switch>
              <Route path="/auth/login" component={Login} />
              <Route path="/auth/registration" component={Registration} />
              <Route path="/auth/forgot-password" component={ForgotPassword} />
              <Redirect from="/auth" exact={true} to="/auth/login" />
              <Redirect to="/auth/login" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
