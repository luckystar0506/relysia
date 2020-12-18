import React, { useEffect, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import axios from "axios";

const tokenTransferUrl =
  "http://ec2-3-133-97-121.us-east-2.compute.amazonaws.com:3001";

function PayButton() {
  useEffect(() => {
    sendUserDataToParentIframe();
  }, []);

  useEffect(() => {
    window.addEventListener("message", transctionInvoked, false);
    return () => {
      window.removeEventListener("message", transctionInvoked, false);
    };
  }, [transctionInvoked]);

  const transctionInvoked = useCallback((event) => {
    if (event.data.case && event.data.case === "bsv-transction-invoked") {
      if (event.data.data) {
        let transcData = JSON.parse(event.data.data);
        makeBsvTransctionFunc(
          transcData.totalAmount,
          transcData.txSet,
          transcData.currency,
          transcData.password,
          transcData.walletDetails
        );
      }
    } else if (
      event.data.case &&
      event.data.case === "token-transction-invoked"
    ) {
      if (event.data.data) {
        let transcData = JSON.parse(event.data.data);
        makeTokenTransctionFunc(
          transcData.totalAmount,
          transcData.txSet,
          transcData.tokenId,
          transcData.password,
          transcData.walletDetails
        );
      }
    }
  }, []);

  const makeTokenTransctionFunc = async (
    totalAmount,
    txSet,
    tokenId,
    password,
    walletDetails
  ) => {
    let sendBsvRes;
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async (idToken) => {
        axios
          .post(tokenTransferUrl + "/api/walletPayButtonTokenTransfer", {
            amount: totalAmount,
            txSet: txSet,
            tokenId: tokenId,
            password,
            walletDetails,
            idToken: idToken, //auth firebase
          })
          .then((response) => {
            window.parent.postMessage(
              {
                case: "token-transction-response",
                data: JSON.stringify({
                  sendBsvRes: response,
                }),
              },
              "*"
            );
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((error) => {
        // Handle error
        sendBsvRes = {
          status: "error",
          msg: "An error occured while performing your Transaction",
        };
        window.parent.postMessage(
          {
            case: "token-transction-response",
            data: JSON.stringify({
              sendBsvRes,
            }),
          },
          "*"
        );
      });
  };

  const makeBsvTransctionFunc = async (
    totalAmount,
    txSet,
    currency,
    password,
    walletDetails
  ) => {
    let sendBsvAPI = firebase.functions().httpsCallable("walletPayButtonBsvs");
    let sendBsvRes = await sendBsvAPI({
      amount: totalAmount,
      txSet: txSet,
      currency: currency,
      password,
      walletDetails,
    });
    //send transc response back to parent
    window.parent.postMessage(
      {
        case: "bsv-transction-response",
        data: JSON.stringify({
          sendBsvRes,
        }),
      },
      "*"
    );
  };

  const sendUserDataToParentIframe = () => {
    console.log("send event");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user avliable");
        //getting user wallets
        firebase
          .database()
          .ref("userWallets/" + user.uid)
          .once("value")
          .then((snap) => {
            if (snap.val()) {
              let wallList = [...Object.values(snap.val())];
              wallList.map((item, indx) => {
                if (item.hdPrivateKey) {
                  delete wallList[indx].hdPrivateKey;
                }
                if (item.hdPublicKey) {
                  delete wallList[indx].hdPublicKey;
                }
                if (item.password) {
                  delete wallList[indx].password;
                }
                if (item.mnemonic) {
                  delete wallList[indx].mnemonic;
                }
              });

              window.parent.postMessage(
                {
                  case: "user-data",
                  data: JSON.stringify(user),
                  walletList: JSON.stringify(wallList),
                },
                "*"
              );
            }
          })
          .catch((err) => {
            window.parent.postMessage(
              { case: "user-data", data: JSON.stringify(user) },
              "*"
            );
          });
      } else {
        console.log("user not avliable");
        window.parent.postMessage({ case: "user-data", data: null }, "*");
      }
    });
  };

  return <div></div>;
}

export default PayButton;
