import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";

var QRCode = require("qrcode.react");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function SendBSV(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [sendBsvDiologueState, setsendBsvDiologueState] = useState(false);
  const [addressField, setaddressField] = useState("");
  const [amountField, setamountField] = useState("");
  const [sendLoader, setsendLoader] = useState(false);

  const sendBsvfunc = () => {
    setsendLoader(true);
    let confirmSend = true;
    if (addressField.length === 0) {
      confirmSend = false;
      enqueueSnackbar("Please enter the address!", { variant: "error" });
    }
    if (amountField.length === 0) {
      confirmSend = false;
      enqueueSnackbar("Please enter the amount!", { variant: "error" });
    }

    if (confirmSend) {
      makeTransctionFunc();
    } else {
      setsendLoader(false);
    }
  };

  const makeTransctionFunc = async () => {
    let sendBsvAPI = firebase.functions().httpsCallable("walletSendBsv");
    let sendBsvRes = await sendBsvAPI({
      hdPrivateKey: props.walletObj.hdPrivateKey,
      opData: ["wallet", "withdrawl"],
      bsvPrice: props.bsvRate,
      withdrawlValues: {
        amount: amountField,
        address: addressField,
      },
      address: props.walletObj.address,
      id: props.walletObj.id,
      password: props.walletObj.password ? props.walletObj.password : "",
      dollarBal: props.walletObj.dollarBal,
    });
    if (sendBsvRes && sendBsvRes.data) {
      if (sendBsvRes.data.status && sendBsvRes.data.status === "error") {
        enqueueSnackbar(sendBsvRes.data.msg, { variant: "error" });
        setsendLoader(false);
      } else if (sendBsvRes.data.status && sendBsvRes.data.status === "success") {
        enqueueSnackbar(sendBsvRes.data.msg, { variant: "success" });
        setsendLoader(false);
        setsendBsvDiologueState(false);
        setamountField("");
        setaddressField("");
      }
    }
  };

  const SendBsvDialog = (
    <Dialog open={sendBsvDiologueState} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
      <IconButton disabled={sendLoader} aria-label="close" className={classes.closeButton} onClick={() => setsendBsvDiologueState(false)}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ paddingBottom: 1 }}>Send BSVs</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>
          {props.walletObj.btcBal} BSV (1 BSV = {props.bsvRate} USD)
        </DialogContentText>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 30, marginTop: 20, width: "80%" }}>
          <FormControl className={`custom-padding`} fullWidth variant="outlined">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              type="number"
              autoFocus
              id="standard-adornment-amount"
              value={amountField}
              onChange={(e) => {
                setamountField(e.target.value);
              }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              //   error={withdrawlValues.amountErrStatus}
              labelWidth={60}
            />
          </FormControl>
          <TextField
            fullWidth
            value={addressField}
            onChange={(e) => {
              setaddressField(e.target.value);
            }}
            label="Recipient Address"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={sendLoader} color="primary" onClick={() => setsendBsvDiologueState(false)}>
          Cancel
        </Button>
        <Button disabled={sendLoader} color="primary" onClick={sendBsvfunc}>
          {sendLoader ? <CircularProgress size={20} /> : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Button
        onClick={() => {
          setsendBsvDiologueState(true);
        }}
        style={{ marginLeft: 10, color: "#ffffff" }}
        startIcon={<ArrowUpwardRoundedIcon />}
      >
        Send BSV
      </Button>
      {SendBsvDialog}
    </>
  );
}

export default SendBSV;
