import React, { useState, useEffect } from "react";
import Computer from "bitcoin-computer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";

import { updateUserWalletsData } from "../../../store/ducks/auth.duck";
import useInterval from "./useInterval";
import MintTokenBtn from "./mintDialog";
import WalletTokens from "./walletTokensComponent";

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
}));

function Tokens(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [walletsList, setwalletsList] = useState([]);
  const [computer, setComputer] = useState(null);

  useEffect(() => {
    if (props.user && props.user.uid) {
      if (props.walletsData) {
        setwalletsList(Object.values(props.walletsData.data.data));
      } else {
        getUserWallets();
      }
    } else {
      props.history.push("/auth");
    }
  }, [props.user]);

  //   useEffect(() => {
  //     if (walletsList && walletsList.length > 0 && !computer) {
  //       console.log("intilize computer objs");
  //       //   let computerArray = [];
  //       //intiliazing bitcoin computer

  //       //   walletsList.map((walletItem, index) => {
  //       //     try {
  //       //       computerArray.push(
  //       //         new Computer({
  //       //           chain: "BSV",
  //       //           network: "livenet",
  //       //           seed: walletItem.mnemonic,
  //       //           path: "m/44'/0'/0'/0/0",
  //       //         })
  //       //       );
  //       //     } catch (err) {
  //       //       computerArray.push(null);
  //       //     }
  //       //   });
  //       //   setComputer(computerArray);
  //     }
  //   }, [walletsList, computer]);

  useInterval(() => {
    if (walletsList && walletsList.length > 0 && !computer) {
      let computerArray = [];
      walletsList.map((walletItem, index) => {
        // try {
        computerArray.push(
          new Computer({
            chain: "BSV",
            network: "testnet",
            seed: walletItem.mnemonic,
            path: "m/44'/0'/0'/0/0",
          })
        );
        // } catch (err) {
        //   computerArray.push(null);
        // }
      });
      console.log("computerArray", computerArray);
      setComputer(computerArray);
    }
  }, 3000);

  const getUserWallets = async () => {
    let walletListAPI = firebase.functions().httpsCallable("getWalletBalances");
    let walletListRes = await walletListAPI();
    if (walletListRes && walletListRes.data && walletListRes.data.status === "success") {
      props.updateUserWalletsData(walletListRes);
      setwalletsList(Object.values(walletListRes.data.data));
    }
    if (walletListRes) {
      return null;
    }
  };

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
                Tokens
              </Typography>

              <MintTokenBtn walletsList={walletsList} computer={computer} />
            </div>
            <div style={{ marginTop: 10 }}>
              {walletsList.map((wallet, index1) => {
                return (
                  <div key={wallet.id + "wallet-" + index1} style={{ marginBottom: 20 }}>
                    <Typography variant="h6" component="h3" style={{ color: "#787d95c2", marginLeft: 10 }}>
                      <DragIndicatorIcon fontSize="small" style={{ marginRight: 6 }} />
                      {wallet.title}
                    </Typography>
                    <div style={{ marginTop: 12, marginBottom: 20, display: "flex", flexWrap: "wrap" }}>
                      <WalletTokens computer={computer ? computer[index1] : null} walletDetails={wallet} />

                      {walletsList.length === 0 && (
                        <Typography variant="caption" color="textSecondary">
                          You didnt have any wallets yet
                        </Typography>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = ({ auth: { user, walletsData } }) => ({
  user,
  walletsData,
});

export default connect(mapStateToProps, { updateUserWalletsData })(Tokens);
