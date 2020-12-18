import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import Computer from "bitcoin-computer";
import WalletTokens from "./walletTokensComponent";

const useStyles = makeStyles((theme) => ({
  paperCon: {
    borderRadius: 15,
    width: "100%",
    minHeight: 260,
    padding: "5px 15px",
    marginBottom: 12,
  },
}));

function TokensView(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [computer, setComputer] = useState(null);
  const [verfiedTokens, setverfiedTokens] = useState([]);

  useEffect(() => {
    getUserVerfiedTokens();
  }, []);

  useEffect(() => {
    setComputer(null);
  }, [props.walletsList]);

  useEffect(() => {
    if (props.walletsList && props.walletsList.length > 0 && !computer && !props.tokensData) {
      let computerArray = [];
      props.walletsList.map((walletItem, index) => {
        try {
          computerArray.push(
            new Computer({
              chain: "BSV",
              network: "testnet",
              // network: "livenet",
              seed: walletItem.mnemonic,
              path: "m/44'/0'/0'/0/0",
            })
          );
        } catch (err) {
          computerArray.push(null);
        }
      });
      setComputer(computerArray);
      props.updateUserTokensData(computerArray);
    } else if (props.walletsList && props.walletsList.length > 0 && !computer) {
      console.log("from redux");
      setComputer(props.tokensData);
    }
  }, [props.walletsList, computer]);

  const getUserVerfiedTokens = () => {
    firebase
      .database()
      .ref("tokens")
      .orderByChild("userEmail")
      .equalTo(props.user.email)
      .once("value")
      .then((snap) => {
        if (snap.val()) {
          let modiArr = [];
          Object.values(snap.val()).map((a, b) => {
            if (a.verfied) {
              modiArr.push(a._id);
            }
          });
          setverfiedTokens(modiArr);
        }
      });
  };

  return (
    <Paper className={classes.paperCon}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1, padding: 17 }}>
          Tokens
        </Typography>

        <Button
          startIcon={<AddRoundedIcon />}
          color="primary"
          variant="contained"
          style={{ marginLeft: "auto", borderRadius: 50, paddingLeft: 25, paddingRight: 25 }}
          onClick={() => props.history.push("/create-token")}
        >
          Mint Token
        </Button>
      </div>
      <div style={{ marginTop: 5, width: "100%" }}>
        <WalletTokens
          verfiedTokens={verfiedTokens}
          computer={computer ? computer[props.selectedWallet] : null}
          walletDetails={props.walletsList[props.selectedWallet]}
        />
      </div>
    </Paper>
  );
}

export default TokensView;
