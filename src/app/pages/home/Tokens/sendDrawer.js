import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { useTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  dialogCon: {
    width: 350,
    padding: "30px 25px",
    [theme.breakpoints.down("sm")]: {
      width: 250,
    },
  },
}));

export default function MintTokenDrawer(props) {
  const classes = useStyles();
  const [drawerState, setdrawerState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [first] = props.tokens;
  const balance = props.tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0);
  const [toField, settoField] = useState("");
  const [amountField, setamountField] = useState("");
  const [sendTokenLoading, setsendTokenLoading] = useState(false);

  const sendTokens = () => {
    setsendTokenLoading(true);

    let pass = true;
    if (toField === "") {
      pass = false;
      enqueueSnackbar("Please provide a public key!", { variant: "error" });
    }
    if (Number(amountField) <= 0) {
      pass = false;
      enqueueSnackbar("Please provide a valid token amount!", { variant: "error" });
    }
    if (pass) {
      //send tokens
      send();
    } else {
      setsendTokenLoading(false);
    }
  };

  const send = async () => {
    const balance = props.tokens.reduce((acc, token) => acc + parseInt(token.coins, 10), 0);
    if (amountField > balance) {
      enqueueSnackbar("You didnt have enough tokens!", { variant: "error" });
      setsendTokenLoading(false);

      return null;
    }
    try {
      props.tokens.sort((a, b) => a.coins - b.coins);
      const newTokens = [];
      let leftToSpend = amountField;
      for (const token of props.tokens) {
        const tokenCoins = parseInt(token.coins, 10);
        if (0 < leftToSpend && 0 < tokenCoins) {
          newTokens.push(await token.send(Math.min(leftToSpend, tokenCoins), toField));
          leftToSpend -= tokenCoins;
        }
      }
      setTimeout(() => {
        enqueueSnackbar("Tokens sent successfully", { variant: "success" });
        setsendTokenLoading(false);
        settoField("");
        setamountField("");
      }, 1500);
    } catch (err) {
      enqueueSnackbar(`error: ${err.message}`, { variant: "error" });
      console.log("err", err);
      setsendTokenLoading(false);
    }
  };

  const mintDrawer = (
    <Drawer
      anchor="right"
      open={drawerState}
      onClose={() => {
        if (!sendTokenLoading) {
          setdrawerState(false);
        }
      }}
    >
      <div className={classes.dialogCon}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography component="h1" variant="h5">
            Send Tokens
          </Typography>
          <IconButton disabled={sendTokenLoading} onClick={() => setdrawerState(false)} style={{ marginLeft: "auto" }}>
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <Paper style={{ border: "0px solid red", borderRadius: "50%", marginRight: 10 }} elevation={2}>
            <Avatar
              src={
                first.tokenImage
                  ? first.tokenImage
                  : `https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg`
              }
              alt="logo"
              style={{ width: 50, height: 50 }}
            />
          </Paper>{" "}
          <div>
            <Typography variant="subtitle1" component="h5" style={{ fontSize: 16, fontWeight: 550, color: theme.palette.textColors.head1 }}>
              {first.name}
            </Typography>
            <Typography variant="caption" component="p" style={{ marginTop: -3, color: theme.palette.textColors.para1 }}>
              Tokens Avaliable: {balance}
            </Typography>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            value={amountField}
            onChange={(e) => {
              setamountField(e.target.value);
            }}
            label="Amount"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
            type="number"
            placeholder={"max: " + balance}
          />
          <TextField
            fullWidth
            value={toField}
            onChange={(e) => {
              settoField(e.target.value);
            }}
            label="To"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 10 }}
            placeholder="public key"
          />

          <Button
            onClick={() => {
              sendTokens();
            }}
            style={{ marginTop: 20, width: "100%" }}
            variant="contained"
            color="secondary"
            disabled={sendTokenLoading}
          >
            {sendTokenLoading ? <CircularProgress style={{ color: "#ffffff" }} size={20} /> : "Send"}
          </Button>
        </div>
      </div>
    </Drawer>
  );

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
        <Paper style={{ border: "0px solid red", borderRadius: "50%" }} elevation={2}>
          <Avatar
            src={
              first.tokenImage
                ? first.tokenImage
                : "https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg"
            }
            alt="logo"
            style={{ width: 50, height: 50 }}
          />
        </Paper>
        <div style={{ marginLeft: "auto" }}>
          <Typography variant="subtitle1" component="span" style={{ fontWeight: 500, color: theme.palette.textColors.textGreen }}>
            {balance}
          </Typography>
        </div>
      </div>
      <Typography
        component="h3"
        variant="subtitle1"
        style={{
          fontWeight: 600,
          display: "block",
          color: theme.palette.textColors.head,
          whiteSpace: "nowrap",
          overflow: "hidden ",
          width: "100%",
          textOverflow: "ellipsis",
        }}
      >
        {first.name}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        style={{
          color: theme.palette.textColors.subParagraph,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          marginTop: 10,
          wordBreak: "break-word",
          minHeight: 40,
          fontWeight: 400,
        }}
      >
        {first.description ? first.description : "-"}
      </Typography>

      <div style={{ marginTop: 10 }}>
        <Button onClick={() => setdrawerState(true)} style={{ color: "#ffffff" }} startIcon={<SendIcon />}>
          Send Token
        </Button>
      </div>
      {mintDrawer}
    </>
  );
}
