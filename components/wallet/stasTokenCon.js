import React, { useState, useEffect } from "react";
import CustomLoader from "../Layouts/CustomLoader";
import ShowMoreText from "react-show-more-text";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateStasTokenDialog from "./createNewStasToken";
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
  const [newTokenDialogState, setnewTokenDialogState] = useState(false);
  const [userCreatedTokens, setuserCreatedTokens] = useState([]); //tokens created by this user
  const [TokenDetailsDialogState, setTokenDetailsDialogState] = useState(false);
  const [selectedTokenDetailsId, setselectedTokenDetailsId] = useState(false);
  const [transferTokenDialogState, settransferTokenDialogState] = useState(
    false
  );
  const [walletStasTokens, setwalletStasTokens] = useState([]); //wallet tokens
  const [walletPrivateKey, setwalletPrivateKey] = useState("");

  useEffect(() => {
    if (props.userDataRedux) {
      getUserCreatedTokens(props.userDataRedux.uid);
    }
  }, [props.userDataRedux]);

  useEffect(() => {
    if (props.walletData) {
      getWalletTokens();
    }
  }, [props.walletData]);

  useEffect(() => {
    if (props.walletData && props.userDataRedux) {
      getWalletKeys(props.walletData.hdPrivateKey, props.walletData.password); //test only
    }
  }, [props.walletData, props.userDataRedux]);

  const getWalletTokens = async () => {
    let walletAddress = props.walletData.address[0];

    let res = await axios({
      method: "get",
      url: `https://taalnet.whatsonchain.com/v1/bsv/taalnet/address/${walletAddress}/tokens`,
      auth: {
        username: "taal_private",
        password: "dotheT@@l007",
      },
    });
    console.log("res", res);
    if (res && res.status === 200 && res.data && res.data.tokens) {
      setwalletStasTokens([...res.data.tokens]);
    }
  };

  const getUserCreatedTokens = async (userId) => {
    let dataObj = await firebase
      .database()
      .ref("stasTokens/userTokens/" + userId + "/myTokens")
      .once("value")
      .then((snap) => (snap.val() ? snap.val() : null));
    if (dataObj) {
      setuserCreatedTokens(Object.values(dataObj));
    }
  };

  const issueTokens = async (
    contractTxid,
    contractPrivateKey,
    contractAddress,
    index
  ) => {
    try {
      toast.info(`Issuing Tokens`, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const contractTx = await getTransaction(contractTxid);
      console.log("contractTx", contractTx);
      const issueHex = issue(
        bsv.PrivateKey.fromString(contractPrivateKey),
        {
          txid: contractTxid,
          vout: 0,
          scriptPubKey: contractTx.vout[0].scriptPubKey.hex,
          amount: contractTx.vout[0].value,
        },
        [
          {
            txid: contractTxid,
            vout: 1,
            scriptPubKey: contractTx.vout[1].scriptPubKey.hex,
            amount: contractTx.vout[1].value,
          },
        ],
        1
      );
      const issueTxid = await broadcast(issueHex);
      console.log(`Issue TX:        ${issueTxid}`);

      let modifiedObj = [...userCreatedTokens];
      modifiedObj[index].tokensIssued = true;
      modifiedObj[index].issueTxid = issueTxid;

      setuserCreatedTokens(modifiedObj);
      //updating firebase
      let updates = {};
      updates[
        "stasTokens/userTokens/" +
          props.userDataRedux.uid +
          "/myTokens/" +
          contractAddress +
          "/tokensIssued"
      ] = true;
      updates[
        "stasTokens/userTokens/" +
          props.userDataRedux.uid +
          "/myTokens/" +
          contractAddress +
          "/issueTxid"
      ] = issueTxid;
      firebase.database().ref().update(updates);

      toast.success(`Tokens issued successfully!`, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.log("catch err", err);
      toast.error(err.message, {
        position: "bottom-left",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    // let standardPublicKey = bsv.PrivateKey.fromString(
    //   standardPrivateKey
    // ).publicKey.toString();
  };

  return (
    <div className="token-view-con" style={{ marginBottom: 50 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <h2 className="dbTag" style={{ display: "block" }}>
          Stas Tokens{" "}
        </h2>
        <p
          className="mint-btn link"
          onClick={() => setnewTokenDialogState(true)}
        >
          Create New Contract
        </p>
      </div>
      <div>
        {userCreatedTokens.map((ele, index) => {
          return (
            <div className="token-ele" key={"my-admin" + index}>
              <Paper className={classes.papercon}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="token-item-2" style={{ marginLeft: 0 }}>
                    <h5>{ele.tokenName}</h5>
                    <p>{ele.tickerSymbol}</p>
                  </div>

                  <p className="stas-tokens-count"> {ele.supply}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {!ele.tokensIssued ? (
                    <Button
                      onClick={() =>
                        issueTokens(
                          ele.contractTxid,
                          ele.contractPrivateKey,
                          ele.contractAddress,
                          index
                        )
                      }
                    >
                      Issue
                    </Button>
                  ) : (
                    <p style={{ margin: 0 }}>
                      Issued{" "}
                      {ele.tokenTransferred &&
                        ele.tokensIssued &&
                        "+ Transferred"}
                    </p>
                  )}

                  {ele.tokensIssued && (
                    <>
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
                    </>
                  )}

                  {!ele.tokenTransferred && ele.tokensIssued && (
                    <Button
                      onClick={() => {
                        selectedTransferTokenIndex = index;
                        transferringWalletTokens = false;
                        settransferTokenDialogState(true);
                      }}
                    >
                      Transfer
                    </Button>
                  )}
                </div>
              </Paper>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="dbTag" style={{ display: "block" }}>
          Wallet Tokens{" "}
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

      <CreateStasTokenDialog
        dialogState={newTokenDialogState}
        setdialogState={setnewTokenDialogState}
        userDataRedux={props.userDataRedux}
        setuserCreatedTokens={setuserCreatedTokens}
        userCreatedTokens={userCreatedTokens}
      />
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
        tokenDetails={
          transferringWalletTokens
            ? walletStasTokens[selectedTransferTokenIndex]
            : userCreatedTokens[selectedTransferTokenIndex]
        }
        setuserCreatedTokens={setuserCreatedTokens}
        userCreatedTokens={userCreatedTokens}
        selectedTransferTokenIndex={selectedTransferTokenIndex}
        getWalletTokens={getWalletTokens}
        transferringWalletTokens={transferringWalletTokens}
        walletPrivateKey={walletPrivateKey}
      />
      <ToastContainer />
    </div>
  );
}
