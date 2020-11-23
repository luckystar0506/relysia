import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import {  updateUserTokensData } from "../../../store/ducks/auth.duck";
import { useSnackbar } from "notistack";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import PublicTokens from "./publicTokens";

const useStyles = makeStyles((theme) => ({
  accountBox1: {
    borderRadius: 15,
    width: "100%",
    padding: "15px 18px",
    marginBottom: 12,
  },

  accountBox1Btn: {
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    marginRight: 20,
  },
  menuIcon: { float: "right", position: "releative", left: 5, bottom: 5 },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

let popoverIndex = 0;

function Tokens(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  //   useEffect(() => {
  //     if (props.user && props.user.uid) {
  //     }
  //   }, [props.user]);

  return (
    <div
      style={{
        width: "100%",
        minWidth: 300,
        maxWidth: 1380,
        margin: "0px auto",
        marginTop: 20,
        padding: 10,
        paddingBottom: 50,
        paddingTop: "4%",
      }}
    >
      <Grid container style={{ padding: "0px 5%" }} justify="space-between">
        <Grid item xs={12} md={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1 }}>
              Public Tokens
            </Typography>
          </div>
          <div style={{ marginTop: 10 }}>
            <PublicTokens />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = ({ auth: { user, walletsData, tokensData } }) => ({
  user,
  walletsData,
  tokensData,
});

export default connect(mapStateToProps, {  updateUserTokensData })(Tokens);
