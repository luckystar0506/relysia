import React, { useState, useRef } from "react";
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

export default function NewWalletDialog(props) {
  const [loading, setloading] = useState(false);
  const [walletName, setwalletName] = useState("");
  const [walletPassword, setwalletPassword] = useState("");

  const handleClose = () => {
    props.setdialogState(false);
  };

  const createNewDialog = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      toast.info("Generating Wallet Keys..", {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      let createWalletAPI = firebase.functions().httpsCallable("createWallet");
      let walletRes = await createWalletAPI({
        title: walletName,
        password: walletPassword,
      });

      if (walletRes && walletRes.data && walletRes.data.status === "success") {
        toast.success("Wallet created Successfully!", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setloading(false);
        handleClose();
        setwalletPassword("");
        setwalletName("");
      } else {
        toast.error("An error occures, Try again!", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setloading(false);
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
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Create New Wallet</h5>
      <form onSubmit={createNewDialog}>
        <DialogContent>
          <div className="form-group">
            <label>Wallet Name</label>
            <input
              onChange={(e) => {
                setwalletName(e.target.value);
              }}
              value={walletName}
              type="text"
              className="form-control"
              placeholder="Enter your Wallet Name"
              required
              maxLength={80}
            />
          </div>
          <div className="form-group">
            <label>Wallet Password</label>
            <input
              onChange={(e) => {
                setwalletPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              placeholder="Enter your Wallet Password"
              value={walletPassword}
              required
              minLength={6}
              maxLength={200}
            />
          </div>
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
                  Update
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
