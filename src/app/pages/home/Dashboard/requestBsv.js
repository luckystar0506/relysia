import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";

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

function RequestBSV(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [requestBsvDiologueState, setrequestBsvDiologueState] = useState(false);
  const [currentAddress, setcurrentAddress] = useState("");

  const RequestBsvDialog = (
    <Dialog
      open={requestBsvDiologueState}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={() => setrequestBsvDiologueState(false)}
    >
      <IconButton aria-label="close" className={classes.closeButton} onClick={() => setrequestBsvDiologueState(false)}>
        <CloseIcon />
      </IconButton>
      <DialogTitle style={{ paddingBottom: 1 }}>Add Funds</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>Use your QR scan to add money to your wallet.</DialogContentText>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 30 }}>
          <div style={{ margin: "22px 0px" }}>
            {currentAddress ? (
              <QRCode value={"bitcoin:" + currentAddress + "?sv"} renderAs="svg" />
            ) : (
              <CircularProgress style={{ margin: "10px 0px" }} color="secondary" />
            )}
          </div>
          <CopyToClipboard
            text={currentAddress ? currentAddress : "-"}
            onCopy={() => enqueueSnackbar("Address Copied", { variant: "success" })}
          >
            <div style={{ cursor: "pointer" }}>
              <FileCopyIcon color="primary" style={{ float: "right", height: 15, width: 15 }} />

              <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                BITCOIN SV ADDRESS
              </Typography>

              <Typography style={{ color: theme.palette.textColors.para2 }} variant="body1">
                {currentAddress ? currentAddress : "-"}
              </Typography>
            </div>
          </CopyToClipboard>
        </div>
      </DialogContent>
    </Dialog>
  );

  useEffect(() => {
    if (props.walletObj) {
      setcurrentAddress(props.walletObj.address[0]);
    }
  }, [props.walletObj]);

  const getDynamicAddress = () => {
    if (props.walletObj.address && props.walletObj.address.length < 20) {
      //generate new
    } else {
      //use randomly
      setcurrentAddress(props.walletObj.address[getRandomInt(0, 20)]);
    }
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  console.log("c-address", currentAddress);
  console.log("walletObj", props.walletObj.address);

  return (
    <>
      <Button
        onClick={() => {
          getDynamicAddress();
          setrequestBsvDiologueState(true);
        }}
        style={{ marginLeft: 10, color: "#ffffff" }}
        startIcon={<ArrowDownwardRoundedIcon />}
      >
        Deposit
      </Button>
      {RequestBsvDialog}
    </>
  );
}

export default RequestBSV;
