import React, { useState, useEffect } from "react";
import loadable from "@loadable/component";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { toAbsoluteUrl } from "../../../../_metronic/utils/utils";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import PerfectScrollbar from "react-perfect-scrollbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withSnackbar } from "notistack";
import { DB1 } from "../../../../index";
import { TitleComponent } from "../../../partials/content/helmetComponent";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import "firebase/database";
import LeftDrawer from "./leftDrawer";
import { makeStyles } from "@material-ui/core/styles";

const Dashboard = loadable(() => import("./Dashboard/dashboard"));
const Settings = loadable(() => import("./Settings/settings"));
const Transactions = loadable(() => import("./Transctions/transctions"));
const Wallet = loadable(() => import("./Wallet/wallet"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    width: "100%",
    margin: "auto",
    display: "flex",
  },
}));
let drawerStateLocalStorage = localStorage.getItem("drawer-state") === "false" ? false : true;

function Overview(props) {
  const classes = useStyles();
  const [drawerState, setdrawerState] = useState(drawerStateLocalStorage);

  return (
    <div className={classes.root}>
      <LeftDrawer open={drawerState} setOpen={setdrawerState} history={props.history} location={props.location} />

      <div style={{ padding: 10, width: "100%" }}>
        {(() => {
          if (props.location.pathname.includes("dashboard")) {
            return <Dashboard />;
          } else if (props.location.pathname.includes("wallet")) {
            return <Wallet />;
          } else if (props.location.pathname.includes("transactions")) {
            return <Transactions />;
          } else if (props.location.pathname.includes("settings")) {
            return <Settings />;
          }
        })()}
      </div>
    </div>
  );
}

export default Overview;
