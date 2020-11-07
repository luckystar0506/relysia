import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

import { useSnackbar } from "notistack";
import { toAbsoluteUrl } from "../../../../_metronic";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

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

function InfoBtn(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [infodialogState, setinfodialogState] = useState(false);

  const infoDialog = (
    <Dialog maxWidth="sm" fullWidth open={infodialogState} TransitionComponent={Transition} onClose={() => setinfodialogState(false)}>
      <IconButton aria-label="close" className={classes.closeButton} onClick={() => setinfodialogState(false)}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>{props.tokenDetails.name}</DialogTitle>
      <DialogContent style={{ marginBottom: 10 }}>
        <DialogContentText>{props.tokenDetails.description}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
  return (
    <>
      <Button style={{ color: "#ffffff" }} onClick={() => setinfodialogState(true)}>
        Info
      </Button>
      {infoDialog}
    </>
  );
}

export default InfoBtn;
