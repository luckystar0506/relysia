import React from "react";
import loadable from "@loadable/component";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { toAbsoluteUrl } from "../../../../_metronic/utils/utils";
import { withStyles } from "@material-ui/core/styles";
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

const styles = (theme) => ({});

function Overview() {
  return (
    <div>
      <h1>overview</h1>
    </div>
  );
}

export default Overview;
