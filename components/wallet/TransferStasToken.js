import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import TextareaAutosize from "react-textarea-autosize";
import CountrySelect from "react-bootstrap-country-select";
import { transfer, utils } from "../../stas-js/index";

const bsv = require("bsv");
const { getFundsFromFaucet, broadcast, getTransaction } = utils;

const useStyles = makeStyles((theme) => ({
  icon: {
    fill: "#f48665",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TrasnferStasTokenDialog(props) {
  const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [recipientPublicKey, setrecipientPublicKey] = useState("");

  const handleClose = () => {
    props.setdialogState(false);
  };

  const transferTokenFunc = async () => {
    setloading(true);
    try {
      console.log("transfer", props.tokenDetails);

      if (props.transferringWalletTokens) {
        await transferWalletTokens();
      } else {
        await transferUserIssuedTokens();
      }
    } catch (err) {
      console.log("catch err", err);
      toast.error(err.message, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setloading(false);
    }
  };

  const transferUserIssuedTokens = async () => {
    // const issueTx = await getTransaction(props.tokenDetails.issueTxid);
    // console.log("issueTx", issueTx);
    // const transferHex = transfer(
    //   bsv.PrivateKey.fromString(props.tokenDetails.contractPrivateKey),
    //   bsv.PrivateKey.fromString(props.tokenDetails.contractPrivateKey)
    //     .publicKey,
    //   {
    //     txid: props.tokenDetails.issueTxid,
    //     vout: 0,
    //     scriptPubKey: issueTx.vout[0].scriptPubKey.hex,
    //     amount: issueTx.vout[0].value,
    //   },
    //   bsv.PublicKey.fromString(recipientPublicKey),
    //   [
    //     {
    //       txid: props.tokenDetails.issueTxid,
    //       vout: 1,
    //       scriptPubKey: issueTx.vout[1].scriptPubKey.hex,
    //       amount: issueTx.vout[1].value,
    //     },
    //   ],
    //   bsv.PrivateKey.fromString(props.tokenDetails.contractPrivateKey)
    // );
    // const transferTxid = await broadcast(transferHex);
    // console.log(`Transfer TX:     ${transferTxid}`);
    // toast.success(`Tokens transferred successfully!`, {
    //   position: "bottom-left",
    //   autoClose: 10000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    // });
    // let updates = {};
    // updates[
    //   "stasTokens/userTokens/" +
    //     props.userDataRedux.uid +
    //     "/myTokens/" +
    //     props.tokenDetails.contractAddress +
    //     "/tokenTransferred"
    // ] = true;
    // firebase.database().ref().update(updates);
    // props.getWalletTokens();
    // setloading(false);
    // handleClose();
  };

  const transferWalletTokens = async () => {
    // const issueTx = await getTransaction(props.tokenDetails.issueTxid);
    // console.log("issueTx", issueTx);
    // const transferHex = transfer(
    //   bsv.PrivateKey.fromString(props.tokenDetails.contractPrivateKey),
    //   bsv.PrivateKey.fromString(props.tokenDetails.contractPrivateKey)
    //     .publicKey,
    //   {
    //     txid: props.tokenDetails.issueTxid,
    //     vout: 0,
    //     scriptPubKey: issueTx.vout[0].scriptPubKey.hex,
    //     amount: issueTx.vout[0].value,
    //   },
    //   bsv.PublicKey.fromString(recipientPublicKey),
    //   [
    //     {
    //       txid: props.tokenDetails.issueTxid,
    //       vout: 1,
    //       scriptPubKey: issueTx.vout[1].scriptPubKey.hex,
    //       amount: issueTx.vout[1].value,
    //     },
    //   ],
    //   bsv.PrivateKey.fromString(props.tokenDetails.contractPrivateKey)
    // );
    // const transferTxid = await broadcast(transferHex);
    // console.log(`Transfer TX:     ${transferTxid}`);
    // toast.success(`Tokens transferred successfully!`, {
    //   position: "bottom-left",
    //   autoClose: 10000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    // });
    // //updating state and db
    // let modifiedObj = [...props.userCreatedTokens];
    // modifiedObj[props.selectedTransferTokenIndex].tokenTransferred = true;
    // props.setuserCreatedTokens(modifiedObj);
    // let updates = {};
    // updates[
    //   "stasTokens/userTokens/" +
    //     props.userDataRedux.uid +
    //     "/myTokens/" +
    //     props.tokenDetails.contractAddress +
    //     "/tokenTransferred"
    // ] = true;
    // firebase.database().ref().update(updates);
    // props.getWalletTokens();
    // setloading(false);
    // handleClose();
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
      className="custom-dialog"
    >
      <PerfectScrollbar style={{ maxHeight: "90vh" }}>
        <h5 style={{ padding: "18px 24px 0px 24px" }}>Trasnfer Tokens</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            transferTokenFunc();
          }}
        >
          <DialogContent>
            <>
              <div className="form-group">
                <label>Recipient Public Key</label>

                <input
                  onChange={(e) => {
                    setrecipientPublicKey(e.target.value);
                  }}
                  value={recipientPublicKey}
                  type="text"
                  className="form-control"
                  placeholder="Enter recipient public key"
                  required
                />
              </div>
            </>
          </DialogContent>
          <DialogActions style={{ marginTop: 10, height: 50 }}>
            {(() => {
              if (loading) {
                return (
                  <div style={{ width: 80 }}>
                    <CustomLoader width={25} height={25} />
                  </div>
                );
              } else {
                return (
                  <button type="submit" className="btn btn-primary btn-small">
                    Submit
                  </button>
                );
              }
            })()}
          </DialogActions>
        </form>
        <ToastContainer />
      </PerfectScrollbar>
    </Dialog>
  );
}
