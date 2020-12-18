import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "firebase/functions";
import "firebase/database";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import WithdrawBsv from "./withdrawBsv";
import WithdrawTokens from "./withdrawTokens";

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
  accountBox1Btn: {
    borderRadius: 50,
    margin: "5px 5px",
  },
}));

function SendBSV(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [sendBsvDiologueState, setsendBsvDiologueState] = useState(false);
  const [sendLoader, setsendLoader] = useState(false);
  const [withdrawType, setwithdrawType] = useState("BSV");

  const SendBsvDialog = (
    <Dialog open={sendBsvDiologueState} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
      <IconButton disabled={sendLoader} aria-label="close" className={classes.closeButton} onClick={() => setsendBsvDiologueState(false)}>
        <CloseIcon />
      </IconButton>
      <div style={{ width: "100%", paddingBottom: 2 }}>
        <DialogTitle style={{ paddingBottom: 1 }}>Send BSVs or Tokens</DialogTitle>
        <div style={{ padding: "10px 25px 0px 25px" }}>
          <DialogContentText style={{ marginBottom: 0 }}>
            {props.walletObj ? props.walletObj.bsvBal : 0} BSV (1 BSV = {props.bsvRate} USD)
          </DialogContentText>
          <div style={{ marginTop: 20 }}>
            <FormControl style={{ width: "70%" }}>
              <InputLabel id="demo-simple-select-label">Withdrawl Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={withdrawType}
                onChange={(e) => setwithdrawType(e.target.value)}
                fullWidth
              >
                <MenuItem value={"BSV"}>BSV</MenuItem>
                <MenuItem value={"Token"}>Token</MenuItem>
              </Select>
            </FormControl>
          </div>
          {withdrawType === "BSV" ? (
            <WithdrawBsv
              bsvRate={props.bsvRate}
              walletObj={props.walletObj}
              sendLoader={sendLoader}
              setsendLoader={setsendLoader}
              setsendBsvDiologueState={setsendBsvDiologueState}
            />
          ) : (
            <WithdrawTokens
              bsvRate={props.bsvRate}
              walletObj={props.walletObj}
              sendLoader={sendLoader}
              setsendLoader={setsendLoader}
              setsendBsvDiologueState={setsendBsvDiologueState}
              computerObj={props.computerObj}
            />
          )}
        </div> 
      </div>
    </Dialog>
  );

  return (
    <>
      <Button
        disabled={props.disabled}
        variant="contained"
        size="small"
        style={{ width: "45%", padding: 12, paddingLeft: 15, paddingRight: 15, backgroundColor: "rgba(0,0,0,0.04)" }}
        className={classes.accountBox1Btn}
        onClick={() => {
          setsendBsvDiologueState(true);
        }}
      >
        Withdraw
      </Button>

      {SendBsvDialog}
    </>
  );
}

export default SendBSV;
