import React, { useState, useRef, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: "#f48665",
    },
    "&:after": {
      borderColor: "#f48665",
    },
  },
  icon: {
    fill: "#f48665",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MintTokenDialog(props) {
  const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [tokenName, settokenName] = useState("");
  const [tokenSupply, settokenSupply] = useState("");
  const [tokenWebUrl, settokenWebUrl] = useState("");
  const [tokenDesc, settokenDesc] = useState("");
  const [tokenImg, settokenImg] = useState("");

  const handleClose = () => {
    props.setdialogState(false);
  };

  const mintTokenFunc = async () => {
    setloading(true);

    try {
      //   if (sendBsvRes && sendBsvRes.data) {
      //     if (sendBsvRes.data.status && sendBsvRes.data.status === "error") {
      //       toast.error(sendBsvRes.data.msg, {
      //         position: "bottom-left",
      //         autoClose: 10000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //       });
      //       setloading(false);
      //     } else if (
      //       sendBsvRes.data.status &&
      //       sendBsvRes.data.status === "success"
      //     ) {
      //       toast.success(sendBsvRes.data.msg, {
      //         position: "bottom-left",
      //         autoClose: 10000,
      //         hideProgressBar: false,
      //         closeOnClick: true,
      //         pauseOnHover: true,
      //         draggable: true,
      //       });
      //       setloading(false);
      //       handleClose();
      //       setwalletAddress("");
      //       setwalletAomunt("");
      //     }
      //   }
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
      className="custom-dialog"
    >
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Mint Token</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mintTokenFunc();
        }}
      >
        <DialogContent>
          <>
            <div className="form-group">
              <label>Token Name</label>

              <input
                onChange={(e) => {
                  settokenName(e.target.value);
                }}
                value={tokenName}
                type="text"
                className="form-control"
                placeholder="Enter token name"
                required
              />
            </div>
            <div className="form-group">
              <label>Token Supply</label>

              <input
                onChange={(e) => {
                  settokenSupply(e.target.value);
                }}
                value={tokenSupply}
                type="number"
                className="form-control"
                placeholder="Enter the desired token supply"
                required
              />
            </div>

            <div className="form-group">
              <label>Website URL</label>

              <input
                onChange={(e) => {
                  settokenWebUrl(e.target.value);
                }}
                value={tokenWebUrl}
                type="text"
                className="form-control"
                placeholder="URL"
                required
              />
            </div>

            <div className="form-group">
              <label>Token Description</label>

              <textarea
                onChange={(e) => {
                  settokenDesc(e.target.value);
                }}
                value={tokenDesc}
                type="text"
                className="form-control"
                placeholder="Description"
                required
                cols="30"
                rows="5"
              />
            </div>
          </>
        </DialogContent>
        <DialogActions style={{ marginTop: 10, height: 50 }}>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-primary btn-small"
            style={{ marginRight: 5 }}
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
