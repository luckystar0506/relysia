import React, { useState, useEffect } from "react";
import CustomLoader from "../Layouts/CustomLoader";
import ShowMoreText from "react-show-more-text";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase, { DB1 } from "../../config/fire-conf";
import Button from "@material-ui/core/Button";
import { utils, issue } from "../../stas-js/index";
import StasTokenDetailsDialog from "./stasTokenDetails";
import TrasnferStasTokenDialog from "./TransferStasToken";
import axios from "axios";

const CryptoJS = require("crypto-js");
const bsv = require("bsv");

const { getFundsFromFaucet, broadcast, getTransaction } = utils;

const useStyles = makeStyles((theme) => ({
  papercon: {
    borderRadius: 15,
    padding: "20px 20px",
  },
}));

let selectedTransferTokenIndex = 0;
let transferringWalletTokens = false;

export default function StasTokenCon(props) {
  const classes = useStyles();
  const [TokenDetailsDialogState, setTokenDetailsDialogState] = useState(false);
  const [selectedTokenDetailsId, setselectedTokenDetailsId] = useState(false);
  const [transferTokenDialogState, settransferTokenDialogState] = useState(
    false
  );
  const [walletStasTokens, setwalletStasTokens] = useState([]); //wallet tokens
  const [walletPrivateKey, setwalletPrivateKey] = useState("");

  // useEffect(() => {
  //   if (props.walletData) {
  //     getWalletTokens();
  //   }
  // }, [props.walletData]);

  useEffect(() => {
    if (props.walletData && props.userDataRedux) {
      getWalletKeys(props.walletData.hdPrivateKey, props.walletData.password); //test only
    }
  }, [props.walletData, props.userDataRedux]);

  const getWalletTokens = async (privateKey) => {
    let privKey = privateKey ? privateKey : walletPrivateKey;

    let walletAddress = bsv.PrivateKey.fromString(privKey)
      .toAddress("testnet")
      .toString(); //test
    console.log("walletAddress", walletAddress);
    let res = await axios({
      method: "get",
      url: `https://taalnet.whatsonchain.com/v1/bsv/taalnet/address/${walletAddress}/tokens`,
      auth: {
        username: "taal_private",
        password: "dotheT@@l007",
      },
    });
    console.log("wallet tokens", res);
    if (res && res.status === 200 && res.data && res.data.tokens) {
      if (res.data.tokens) {
        setwalletStasTokens([...res.data.tokens]);
      } else {
        setwalletStasTokens([]);
      }
    }
  };

  const getWalletKeys = async (prvKey, password) => {
    let gethdPrivateKey = CryptoJS.AES.decrypt(prvKey, password).toString(
      CryptoJS.enc.Utf8
    );

    let hdPrivateKey = bsv.HDPrivateKey.fromString(gethdPrivateKey);

    let standardPrivateKey = hdPrivateKey
      .deriveChild("m/44'/0'/0'/0/0")
      .privateKey.toString();

    setwalletPrivateKey(standardPrivateKey);

    getWalletTokens(standardPrivateKey);
    // let standardPublicKey = bsv.PrivateKey.fromString(
    //   standardPrivateKey
    // ).publicKey.toString();
  };

  return (
    <div className="token-view-con" style={{ marginBottom: 50 }}>
      <div style={{ marginBottom: 10 }}>
        <h2 className="dbTag" style={{ display: "block" }}>
          Wallet Tokens
        </h2>
        {walletStasTokens.map((ele, index) => {
          return (
            <div className="token-ele" key={"wallet-stas-token" + index}>
              <Paper className={classes.papercon}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="token-item-2" style={{ marginLeft: 0 }}>
                    <h5>{ele.ticker}</h5>
                    <p>{ele.protocol}</p>
                  </div>

                  <p className="stas-tokens-count"> {ele.balance}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <p
                    className="link"
                    onClick={() => {
                      setselectedTokenDetailsId(ele.tokenId);
                      setTokenDetailsDialogState(true);
                    }}
                    style={{ margin: 0 }}
                  >
                    token details
                  </p>

                  <Button
                    onClick={() => {
                      selectedTransferTokenIndex = index;
                      transferringWalletTokens = true;

                      settransferTokenDialogState(true);
                    }}
                  >
                    Transfer
                  </Button>
                </div>
              </Paper>
            </div>
          );
        })}
      </div>

      <StasTokenDetailsDialog
        dialogState={TokenDetailsDialogState}
        setdialogState={setTokenDetailsDialogState}
        userDataRedux={props.userDataRedux}
        selectedTokenDetailsId={selectedTokenDetailsId}
      />
      <TrasnferStasTokenDialog
        dialogState={transferTokenDialogState}
        setdialogState={settransferTokenDialogState}
        userDataRedux={props.userDataRedux}
        // tokenDetails={
        //   transferringWalletTokens
        //     ? walletStasTokens[selectedTransferTokenIndex]
        //     : userCreatedTokens[selectedTransferTokenIndex]
        // }

        selectedTransferTokenIndex={selectedTransferTokenIndex}
        getWalletTokens={getWalletTokens}
        transferringWalletTokens={transferringWalletTokens}
        walletPrivateKey={walletPrivateKey}
      />
      <ToastContainer />
    </div>
  );
}
