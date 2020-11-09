import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  GridCon: {
    margin: "0px auto",
    width: "100%",
  },
}));

function TokenSelection(props) {
  const classes = useStyles();

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <Grid container justify="center" alignItems="stretch" className={classes.GridCon} spacing={1}>
        {props.openTab}
        {props.teamTab}
        {props.privateTab}
      </Grid>
    </div>
  );
}

export default TokenSelection;
