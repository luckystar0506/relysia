import React, { useState } from "react";
import { useSnackbar } from "notistack";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ClickNHold from "react-click-n-hold";

function WithdrawBsv(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [addressField, setaddressField] = useState("");
  const [amountField, setamountField] = useState("");

  const sendBsvfunc = (e, enough) => {
    if (enough) {
      props.setsendLoader(true);
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
        props.setsendLoader(false);
      }
    } else {
      enqueueSnackbar("Press and hold the Button for 2 seconds", { variant: "info" });
    }
  };

  const makeTransctionFunc = async () => {
    let sendBsvAPI = firebase.functions().httpsCallable("walletSendBsv");
    let sendBsvRes = await sendBsvAPI({
      hdPrivateKey: props.walletObj ? props.walletObj.hdPrivateKey : "",
      opData: ["wallet", "withdrawl"],
      bsvPrice: props.bsvRate,
      withdrawlValues: {
        amount: amountField,
        address: addressField,
      },
      address: props.walletObj ? props.walletObj.address : "",
      id: props.walletObj ? props.walletObj.id : "",
      password: props.walletObj && props.walletObj.password ? props.walletObj.password : "",
      dollarBal: props.walletObj ? props.walletObj.dollarBal : "",
    });
    if (sendBsvRes && sendBsvRes.data) {
      if (sendBsvRes.data.status && sendBsvRes.data.status === "error") {
        enqueueSnackbar(sendBsvRes.data.msg, { variant: "error" });
        props.setsendLoader(false);
      } else if (sendBsvRes.data.status && sendBsvRes.data.status === "success") {
        enqueueSnackbar(sendBsvRes.data.msg, { variant: "success" });
        props.setsendLoader(false);
        props.setsendBsvDiologueState(false);
        setamountField("");
        setaddressField("");
      }
    }
  };

  return ( 
    <>
      <div style={{ marginTop: 20, width: "80%" }}>
        <FormControl className={`custom-padding`} fullWidth variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            type="number"
            autoFocus
            id="standard-adornment-amount"
            onChange={(e) => {
              setamountField(e.target.value);
            }}
            value={amountField}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <TextField
          fullWidth
          onChange={(e) => {
            setaddressField(e.target.value);
          }}
          value={addressField}
          label="Recipient Address"
          variant="outlined"
          className={`custom-padding`}
          style={{ marginTop: 10 }}
        />
      </div>

      <DialogActions style={{ position: "relative", left: 20, marginTop: 20 }}>
        <Button disabled={props.sendLoader} color="primary" onClick={() => props.setsendBsvDiologueState(false)}>
          Cancel
        </Button>

        <ClickNHold time={1.5} onEnd={sendBsvfunc}>
          <Button disabled={props.sendLoader} color="primary" style={{ width: 100 }}>
            {props.sendLoader ? <CircularProgress size={20} /> : "Send BSV"}
          </Button>
        </ClickNHold>
      </DialogActions>
    </>
  );
}

export default WithdrawBsv;
