import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

var QRCode = require("qrcode.react");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  clipCon: {
    cursor: "pointer",
    width: "70%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

export default function DepositeDialog(props) {
  const classes = useStyles();
  const [currentAddress, setcurrentAddress] = useState("");

  useEffect(() => {
    if (props.walletData) {
      setcurrentAddress(props.walletData.address[0]);
    }
  }, [props.walletData]);

  const handleClose = () => {
    props.setdialogState(false);
  };

  const getDynamicAddress = () => {
    //use randomly
    setcurrentAddress(
      props.walletData.address[
        getRandomInt(0, props.walletData.address.length - 1)
      ]
    );
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      style={{ zIndex: 1000 }}
      maxWidth="sm"
    >
      <div style={{ padding: "18px 24px 5px 24px" }}>
        <h5>Add Funds</h5>
        <p>Use your QR scan to add money to your wallet.</p>
      </div>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="deposite-dialog-con"
        >
          <div style={{ margin: "15px 0px 30px 0px" }}>
            {currentAddress ? (
              <QRCode
                value={"bitcoin:" + currentAddress + "?sv"}
                renderAs="svg"
              />
            ) : (
              <CircularProgress
                style={{ margin: "10px 0px" }}
                color="secondary"
              />
            )}
          </div>
          <CopyToClipboard
            text={currentAddress ? currentAddress : "-"}
            onCopy={() => {
              toast.info("Wallet Address Copied", {
                position: "bottom-left",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }}
          >
            <div className={classes.clipCon}>
              <FileCopyIcon
                color="primary"
                style={{ float: "right", height: 15, width: 15 }}
              />

              <h3 variant="subtitle1">BITCOIN SV ADDRESS</h3>

              <p
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {currentAddress ? currentAddress : "-"}
              </p>
            </div>
          </CopyToClipboard>
          <CopyToClipboard
            text={
              props.walletComputerObj
                ? props.walletComputerObj.db.wallet.getPublicKey().toString()
                : "-"
            }
            onCopy={() => {
              toast.info("Wallet Public-key Copied", {
                position: "bottom-left",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }}
          >
            <div className={classes.clipCon} style={{ marginTop: 20 }}>
              <FileCopyIcon
                color="primary"
                style={{ float: "right", height: 15, width: 15 }}
              />

              <h3 variant="subtitle1">WALLET PUBLIC KEY</h3>

              <p
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                variant="body1"
              >
                {props.walletComputerObj
                  ? props.walletComputerObj.db.wallet.getPublicKey().toString()
                  : "-"}
              </p>
            </div>
          </CopyToClipboard>
        </div>
      </DialogContent>
      <DialogActions style={{ marginTop: 10, height: 50 }}>
        <button
          onClick={handleClose}
          type="button"
          className="btn btn-primary btn-small"
        >
          Close
        </button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
}
