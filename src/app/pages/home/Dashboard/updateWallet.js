import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import SettingsIcon from "@material-ui/icons/Settings";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateWallet(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [updateWalletDiologue, setupdateWalletDiologue] = useState(false);
  const [walletNameField, setwalletNameField] = useState("");
  const [deleteDialog, setdeleteDialog] = useState(false);

  const updateWallet = () => {
    if (walletNameField.length <= 0) {
      enqueueSnackbar("Please provide a valid Wallet Name!", { variant: "error" });
      return null;
    }

    //updatiing wallet name
    let modifiedArr = [...props.walletsList];
    modifiedArr[props.walletIndex].title = walletNameField;
    props.setwalletsList(modifiedArr);

    let updates = {};
    updates["userWallets/" + props.userID + "/" + props.walletDetails.id + "/title"] = walletNameField;
    firebase
      .database()
      .ref()
      .update(updates);

    enqueueSnackbar("Wallet Details Updated!", { variant: "success" });
    setupdateWalletDiologue(false);
  };

  const deleteWallet = () => {
    //updatiing wallet name
    let modifiedArr = [...props.walletsList];
    modifiedArr.splice(props.walletIndex, 1);
    props.setwalletsList(modifiedArr);

    let updates = {};
    updates["userWallets/" + props.userID + "/" + props.walletDetails.id] = {};
    firebase
      .database()
      .ref()
      .update(updates);

    enqueueSnackbar("Wallet Deleted Successfully!", { variant: "info" });
    setdeleteDialog(false);
    setupdateWalletDiologue(false);
  };

  const DeleteConfirmation = (
    <Dialog open={deleteDialog} TransitionComponent={Transition} keepMounted fullWidth maxWidth="xs" onClose={() => setdeleteDialog(false)}>
      <DialogTitle style={{ paddingBottom: 1 }}>Confirmation Required</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>
          Warning deleting wallet will lost all keys and money within wallet!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setdeleteDialog(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={deleteWallet}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  const UpdateWalletDialog = (
    <Dialog
      open={updateWalletDiologue}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={() => setupdateWalletDiologue(false)}
    >
      <IconButton aria-label="close" className={classes.closeButton} onClick={() => setupdateWalletDiologue(false)}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ paddingBottom: 1 }}>Wallet Settings</DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", flexDirection: "column", width: "70%", marginTop: 20 }}>
          <TextField
            value={walletNameField}
            onChange={(e) => {
              setwalletNameField(e.target.value);
            }}
            label="Wallet Name"
            variant="outlined"
            className={`custom-padding`}
          />
          <div style={{ marginTop: 20 }}>
            <Typography color="textSecondary">(Mnemonic Phrase) Please write down your backup phrase to secure your wallet.</Typography>
            <CopyToClipboard
              text={props.walletDetails.mnemonic ? props.walletDetails.mnemonic : "unknown"}
              onCopy={() => enqueueSnackbar("Mnemonic Copied", { variant: "success" })}
            >
              <Typography style={{ fontWeight: 500, cursor: "pointer" }} variant="subtitle2">
                {props.walletDetails.mnemonic ? props.walletDetails.mnemonic : "unknown"}
              </Typography>
            </CopyToClipboard>
          </div>
          <div>
            <Button style={{ marginTop: 20, color: "red" }} onClick={() => setdeleteDialog(true)}>
              {" "}
              Delete Wallet
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setupdateWalletDiologue(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={updateWallet}>
          Update
        </Button>
      </DialogActions>
      {DeleteConfirmation}
    </Dialog>
  );

  return (
    <>
      <IconButton
        style={{ marginLeft: "auto", color: "#ffffff" }}
        onClick={() => {
          setwalletNameField(props.walletDetails.title);
          setupdateWalletDiologue(true);
        }}
      >
        <SettingsIcon />
      </IconButton>
      {UpdateWalletDialog}
    </>
  );
}

export default UpdateWallet;
