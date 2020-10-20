import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import PortletHeaderDropdown from "../partials/content/CustomDropdowns/PortletHeaderDropdown";
import firebase from "firebase/app";
import "firebase/functions";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";

var QRCode = require("qrcode.react");

export default function WithdrawlComponent(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [openMnemonic, setopenMnemonic] = useState(false);
  const [openWithdrawDialog, setopenWithdrawDialog] = useState(false);
  const [withdrawlValues, setwithdrawlValues] = React.useState({
    amount: "",
    address: "",
    opData: [""],
    amountErrStatus: false,
    addressErrStatus: false,
  });
  const [showLoader, setshowLoader] = useState(false);
  const [refreshButton, setrefreshButton] = useState(false);
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");

  const mnemonicButton = <Button onClick={() => setopenMnemonic(true)}> Mnemonic Phrase </Button>;

  const handleChangeWithdrawlValues = (prop) => (event) => {
    if (String(event.target.value).length === 0) {
      setwithdrawlValues({
        ...withdrawlValues,
        [prop]: event.target.value,
        [prop + "ErrStatus"]: true,
      });
    } else {
      setwithdrawlValues({
        ...withdrawlValues,
        [prop]: event.target.value,
        [prop + "ErrStatus"]: false,
      });
    }
  };

  const mnemonicDialog = (
    <Dialog
      open={openMnemonic}
      onClose={() => setopenMnemonic(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Backup your Wallet</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Please write down your backup phrase to secure your wallet.</DialogContentText>
        <DialogContentText id="alert-dialog-description">
          <p style={{ width: "70%" }}>
            <b> {props.mnemonic} </b>{" "}
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopenMnemonic(false)} color="primary">
          close
        </Button>
      </DialogActions>
    </Dialog>
  );

  const withdrawlConfirm = () => {
    setshowLoader(true);
    let confirmWithdrawl = true;
    let updateObj = { ...withdrawlValues };
    if (withdrawlValues.address.length === 0) {
      updateObj = { ...updateObj, addressErrStatus: true };
      confirmWithdrawl = false;
      enqueueSnackbar("Please enter the address", { variant: "error" });
    }
    if (String(withdrawlValues.amount).length === 0) {
      updateObj = { ...updateObj, amountErrStatus: true };
      confirmWithdrawl = false;
      enqueueSnackbar("Please enter the amount", { variant: "error" });
    }
    if (!confirmWithdrawl) {
      setwithdrawlValues({ ...updateObj });
      setshowLoader(false);
    } else {
      setshowLoader(true);
      makeWithdrawlFunc();
    }
  };

  const makeWithdrawlFunc = async () => {
    let withdrawlAPI = firebase.functions().httpsCallable("makeWithdrawal");
    let withdrawlRes = await withdrawlAPI({
      hdPrivateKey: props.hdPrivateKey,
      opData: props.opData,
      txoSet: props.txoSet,
      bsvPrice: props.bsvPrice,
      withdrawlValues: withdrawlValues,
    });
    if (withdrawlRes && withdrawlRes.data) {
      if (withdrawlRes.data.status && withdrawlRes.data.status === "error") {
        enqueueSnackbar(withdrawlRes.data.msg, { variant: "error" });
        setshowLoader(false);
      } else if (withdrawlRes.data.status && withdrawlRes.data.status === "success") {
        enqueueSnackbar(withdrawlRes.data.msg, { variant: "success" });
        setshowLoader(false);
        setopenWithdrawDialog(false);
      }
    }
  };

  const withdrawDialog = (
    <Dialog open={openWithdrawDialog} onClose={() => setopenWithdrawDialog(false)} aria-labelledby="withdraw-dialog">
      <DialogTitle id="withdraw-dialog-title">Withdraw</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Confirmation Text</DialogContentText> */}
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            type="number"
            autoFocus
            id="standard-adornment-amount"
            value={withdrawlValues.amount}
            onChange={handleChangeWithdrawlValues("amount")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            error={withdrawlValues.amountErrStatus}
          />
        </FormControl>{" "}
        <TextField
          margin="dense"
          id="address"
          label="Address"
          fullWidth
          value={withdrawlValues.address}
          onChange={handleChangeWithdrawlValues("address")}
          error={withdrawlValues.addressErrStatus}
        />
      </DialogContent>
      <DialogActions>
        <div>
          <Button onClick={() => setopenWithdrawDialog(false)} color="primary">
            Cancel
          </Button>
        </div>
        <div style={{ width: "20%" }}>
          <Button onClick={withdrawlConfirm} color="primary" style={{ display: showLoader ? "none" : "inline-block" }}>
            Confirm
          </Button>
          <CircularProgress
            size={20}
            style={{
              margin: "0px 20px",
              display: showLoader ? "inline-block" : "none",
            }}
          />
        </div>
      </DialogActions>
    </Dialog>
  );

  const refreshMetrices = () => {
    setrefreshButton(true);
    let getMetrices = firebase.functions().httpsCallable("getMetrices");
    getMetrices();
    setTimeout(() => {
      setrefreshButton(false);
    }, 3000);
  };

  useEffect(() => {
    //getting webinar user details
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setuserID(user.uid);
        setuserName(user.displayName);
      }
    });
  }, []);

  if (props.address === "") {
    return (
      <Card style={{ marginTop: 9, padding: 10, height: 295 }}>
        <p> Loading </p>
      </Card>
    );
  } else {
    return (
      <div
        className="kt-portlet kt-portlet--height-fluid"
        style={{ marginTop: 9, padding: 0, marginBottom: 10, height: "auto", minHeight: 295 }}
      >
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <span>
              {" "}
              <h3 className="kt-portlet__head-title" style={{ paddingRight: 5 }}>
                Bitcoin Wallet:
              </h3>{" "}
              $ {((props.balance * props.bsvPrice) / 100000000).toFixed(2)}
              <IconButton color="secondary" onClick={refreshMetrices} size="small" style={{ marginLeft: 10 }}>
                {refreshButton ? (
                  <CircularProgress color="secondary" size={16} thickness={4.2} />
                ) : (
                  <RefreshIcon style={{ height: 16, width: 16 }} />
                )}
              </IconButton>
            </span>
          </div>
          <PortletHeaderDropdown mnemonicBtn={mnemonicButton} />
        </div>
        <div style={{ textAlign: "center", padding: 10 }}>
          <p> {props.address} </p>

          <QRCode value={"bitcoin:" + props.address + "?sv"} renderAs="svg" />
          <br />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Button style={{ marginTop: 12 }} onClick={() => setopenWithdrawDialog(true)}>
              withdraw
            </Button>
          </div>
        </div>
        {mnemonicDialog} {withdrawDialog}{" "}
      </div>
    );
  }
}
