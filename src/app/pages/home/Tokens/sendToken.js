import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
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

const useStyles = makeStyles((theme) => ({}));

function SendToken(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [toField, settoField] = useState("");
  const [amountField, setamountField] = useState("");
  const [sendTokenLoading, setsendTokenLoading] = useState(false);

  const [first] = props.tokens;
  const balance = props.tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0);

  const sendTokens = () => {
    setsendTokenLoading(true);

    let pass = true;
    if (toField === "") {
      pass = false;
      enqueueSnackbar("Please provide a public key!", { variant: "error" });
    }
    if (Number(amountField) <= 0) {
      pass = false;
      enqueueSnackbar("Please provide a valid token amount!", { variant: "error" });
    }
    if (pass) {
      //send tokens
      send();
    } else {
      setsendTokenLoading(false);
    }
  };

  const send = async () => {
    const balance = props.tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0);
    if (amountField > balance) {
      enqueueSnackbar("You didnt have enough tokens!", { variant: "error" });
      setsendTokenLoading(false);

      return null;
    }
    try {
      props.tokens.sort((a, b) => a.coins - b.coins);
      const newTokens = [];
      let leftToSpend = amountField;
      for (const token of props.tokens) {
        const tokenCoins = parseInt(token.coins, 10);
        if (0 < leftToSpend && 0 < tokenCoins) {
          newTokens.push(await token.send(Math.min(leftToSpend, tokenCoins), toField));
          leftToSpend -= tokenCoins;
        }
      }
      setTimeout(() => {
        enqueueSnackbar("Tokens sent successfully", { variant: "success" });
        setsendTokenLoading(false);
        settoField("");
        setamountField("");
      }, 1500);
    } catch (err) {
      enqueueSnackbar(`error: ${err.message}`, { variant: "error" });
      console.log("err", err);
      setsendTokenLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          component="h3"
          variant="subtitle1"
          style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden ", textOverflow: "ellipsis" }}
        >
          {first.name}
        </Typography>
        <Typography variant="subtitle1" style={{ marginLeft: "auto" }}>
          quantity: {balance}
        </Typography>
      </div>

      <div style={{ paddingBottom: 10 }}>
        <TextField
          fullWidth
          value={amountField}
          onChange={(e) => {
            setamountField(e.target.value);
          }}
          label="Amount"
          variant="outlined"
          className={`custom-padding`}
          style={{ marginTop: 10 }}
          type="number"
        />
        <TextField
          fullWidth
          value={toField}
          onChange={(e) => {
            settoField(e.target.value);
          }}
          label="To"
          variant="outlined"
          className={`custom-padding`}
          style={{ marginTop: 10 }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => {
            sendTokens();
          }}
          style={{ marginLeft: 10, color: "#ffffff" }}
          startIcon={sendTokenLoading ? null : <SendIcon />}
          disabled={sendTokenLoading}
        >
          {sendTokenLoading ? <CircularProgress style={{ color: "#ffffff" }} size={20} /> : "Send"}
        </Button>
      </div>
    </>
  );
}

export default SendToken;