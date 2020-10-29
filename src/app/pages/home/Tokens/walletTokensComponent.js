import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useInterval from "./useInterval";
import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import SendToken from "./sendToken";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DB1 } from "../../../../index";
import RefreshIcon from "@material-ui/icons/Refresh";
import { updateUserWalletsData } from "../../../store/ducks/auth.duck";

const useStyles = makeStyles((theme) => ({
  walletEleCon: {
    borderRadius: 15,
    maxHeight: 210,
    width: 300,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "12px 18px",
    marginBottom: 12,
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 200,
    },
  },
}));

function WalletTokens(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [tokensList, settokensList] = useState([]);

  useInterval(() => {
    const refresh = async () => {
      if (props.computer) {
        const revs = await props.computer.getRevs(props.computer.db.wallet.getPublicKey().toString());
        settokensList(await Promise.all(revs.map(async (rev) => props.computer.sync(rev))));
      }
    };
    refresh();
  }, 3000);

  const groupByRoot = (list) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        [obj["_rootId"]]: (acc[obj["_rootId"]] || []).concat(obj),
      }),
      {}
    );

  return (
    <>
      {Object.values(groupByRoot(tokensList)).map((tokens, index) => {
        // console.log("tokens", tokens);
        return (
          <Paper
            className={classes.walletEleCon}
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            key={tokens[0]._id}
          >
            <SendToken tokens={tokens} />
          </Paper>
        );
      })}
      {tokensList.length === 0 && (
        <Typography style={{ marginLeft: 30 }} variant="caption" color="textSecondary">
          You didnt have any tokens in this wallet yet
        </Typography>
      )}
    </>
  );
}

export default WalletTokens;
