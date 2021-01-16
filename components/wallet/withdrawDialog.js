import React, { useState, useRef, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WithdrawDialog(props) {
  const [loading, setloading] = useState(false);
  const [walletAomunt, setwalletAomunt] = useState("");
  const [walletAddress, setwalletAddress] = useState("");

  const handleClose = () => {
    props.setdialogState(false);
  };

  const withdrawBSVs = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      let sendBsvAPI = firebase.functions().httpsCallable("walletSendBsv");
      let sendBsvRes = await sendBsvAPI({
        opData: ["relysia", "withdrawl"],
        withdrawlValues: {
          amount: walletAomunt,
          address: walletAddress,
        },
        id: props.walletData ? props.walletData.id : "",
      });

      if (sendBsvRes && sendBsvRes.data) {
        if (sendBsvRes.data.status && sendBsvRes.data.status === "error") {
          toast.error(sendBsvRes.data.msg, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        } else if (
          sendBsvRes.data.status &&
          sendBsvRes.data.status === "success"
        ) {
          toast.success(sendBsvRes.data.msg, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setloading(false);
          handleClose();
          setwalletAddress("");
          setwalletAomunt("");
        }
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

  return (
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      style={{ zIndex: 100 }}
      maxWidth="sm"
    >
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Transfer BSVs</h5>
      <form onSubmit={withdrawBSVs}>
        <DialogContent>
          <div className="form-group">
            <label>Aomunt</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  $
                </span>
              </div>
              <input
                onChange={(e) => {
                  setwalletAomunt(e.target.value);
                }}
                value={walletAomunt}
                type="number"
                className="form-control"
                placeholder="USD"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Recipient Wallet Address</label>
            <input
              onChange={(e) => {
                setwalletAddress(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Wallet Address"
              value={walletAddress}
              required
              maxLength={200}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ marginTop: 10, height: 50 }}>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-primary btn-small"
            style={{marginRight:5}}
          >
            Cancel
          </button>
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
                  Send
                </button>
              );
            }
          })()}
        </DialogActions>
      </form>
      <ToastContainer />
    </Dialog>
  );
}
