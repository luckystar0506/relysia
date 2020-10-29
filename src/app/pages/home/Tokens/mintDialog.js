import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
import Utils from "./utils";
import CloseIcon from "@material-ui/icons/Close";

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

function MintTokenBtn(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [mintDiologueState, setmintDiologueState] = useState(false);
  const [mintingLoader, setmintingLoader] = useState(false);
  const [supplyField, setsupplyField] = useState(0);
  const [mintNameField, setmintNameField] = useState("");
  const [selectedWallet, setselectedWallet] = useState(0);

  const mintToken = async () => {
    let pass = true;
    setmintingLoader(true);
    if (supplyField <= 0) {
      pass = false;
      enqueueSnackbar("Token Supply should be greater than 0", { variant: "error" });
    }
    if (mintNameField === "") {
      pass = false;
      enqueueSnackbar("Please provide a valid Token name", { variant: "error" });
    }
    if (!pass) {
      setmintingLoader(false);
    } else {
      if (props.computer[Number(selectedWallet)]) {
        try {
          const publicKey = props.computer[Number(selectedWallet)].db.wallet.getPublicKey().toString();
          const TokenSc = await Utils.importFromPublic("/token-sc.js");
          console.log("TokenSc", publicKey, supplyField, mintNameField, TokenSc,props.computer[Number(selectedWallet)]);

          const token = await props.computer[Number(selectedWallet)].new(TokenSc, [publicKey, supplyField, mintNameField]);

          console.log(`Minted ${token.name} with supply ${supplyField} and id ${token._id}`);
          enqueueSnackbar(`Minted ${token.name} token successfully!`, { variant: "success" });

          setmintingLoader(false);
        } catch (err) {
          console.log("err", err);
          if (err.message.startsWith("Insufficient balance in address")) {
            enqueueSnackbar("Insufficient balance in address", { variant: "error" });
          } else {
            enqueueSnackbar(err.message, { variant: "error" });
          }
          setmintingLoader(false);
        }
      }
    }
  };

  const MintDialog = (
    <Dialog open={mintDiologueState} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
      <IconButton disabled={mintingLoader} aria-label="close" className={classes.closeButton} onClick={() => setmintDiologueState(false)}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ paddingBottom: 1 }}>Create Token</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>Small amount will be charge</DialogContentText>
        <div style={{ display: "flex", flexDirection: "column", marginBottom: 30, marginTop: 20, width: "80%" }}>
          <TextField
            fullWidth
            value={supplyField}
            onChange={(e) => {
              setsupplyField(e.target.value);
            }}
            label="Token Supply"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
          />
          <TextField
            fullWidth
            value={mintNameField}
            onChange={(e) => {
              setmintNameField(e.target.value);
            }}
            label="Token Name"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
          />
          <FormControl style={{ marginTop: 10, width: "70%", marginLeft: 4 }}>
            <InputLabel>Wallet</InputLabel>
            <Select
              value={selectedWallet}
              onChange={(e) => {
                setselectedWallet(e.target.value);
              }}
            >
              {props.walletsList.map((selectItem, indx) => {
                return (
                  <MenuItem key={selectItem.id + "opt" + indx} value={indx}>
                    {selectItem.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={mintingLoader} color="primary" onClick={() => setmintDiologueState(false)}>
          Cancel
        </Button>
        <Button disabled={mintingLoader} color="primary" onClick={mintToken}>
          {mintingLoader ? <CircularProgress size={20} /> : "Mint"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Button
        startIcon={<AddRoundedIcon />}
        color="primary"
        variant="contained"
        style={{ marginLeft: "auto", borderRadius: 50, paddingLeft: 25, paddingRight: 25 }}
        onClick={() => setmintDiologueState(true)}
      >
        Mint Token
      </Button>
      {MintDialog}
    </>
  );
}

export default MintTokenBtn;
