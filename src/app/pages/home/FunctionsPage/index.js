import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import "firebase/functions";
import "firebase/database";
import { useSnackbar } from "notistack";
import { toAbsoluteUrl } from "../../../../_metronic";

const useStyles = makeStyles((theme) => ({
  accountBox1: {
    borderRadius: 15,
    width: "100%",
    padding: "15px 18px",
    marginBottom: 12,
  },

  accountBox1Btn: {
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    marginRight: 20,
  },
  menuIcon: { float: "right", position: "releative", left: 5, bottom: 5 },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  walletEleCon: {
    borderRadius: 15,
    height: 210,
    width: 200,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "15px 18px",
    marginBottom: 12,
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 200,
    },
  },
}));

function FunctionsPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://zapier.com/apps/embed/widget.js?services=gmail&html_id=foo";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minWidth: 300,
        maxWidth: 1380,
        margin: "0px auto",
        marginTop: 20,
        padding: 10,
        paddingBottom: 50,
        paddingTop: "4%",
      }}
    >
      <Grid container style={{ padding: "0px 5%" }} justify="space-between">
        <Grid item xs={12} md={12}>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1 }}>
                Zap Templates
              </Typography>
            </div>
            <div id="foo"></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default FunctionsPage;
