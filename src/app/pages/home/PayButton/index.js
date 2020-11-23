import React, { useEffect, useCallback } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
        makeBsvTransctionFunc(transcData.amountField, transcData.addressField, transcData.type, transcData.currency);
      }
    } else if (event.data.case && event.data.case === "token-transction-invoked") {
      if (event.data.data) {
        let transcData = JSON.parse(event.data.data);
        makeTokenTransctionFunc(transcData.amountField, transcData.addressField, transcData.tokenId, transcData.type);
      }
    }
  }, []);

  const makeTokenTransctionFunc = async (amountField, addressField, tokenId, type = 0) => {
    let sendBsvAPI = firebase.functions().httpsCallable("walletPayButtonToken");
    let sendBsvRes = await sendBsvAPI({
      amount: amountField,
      address: addressField,
      tokenId: tokenId,
    });
    //send transc response back to parent
    window.parent.postMessage(
      {
        case: "token-transction-response",
        data: JSON.stringify({
          sendBsvRes,
          type,
        }),
      },
      "*"
    );
  };

  const makeBsvTransctionFunc = async (amountField, addressField, type = 0, currency) => {
    let sendBsvAPI = firebase.functions().httpsCallable("walletPayButtonBsvs");
    let sendBsvRes = await sendBsvAPI({
      amount: amountField,
      address: addressField,
      currency: currency,
    });
    //send transc response back to parent
    window.parent.postMessage(
      {
        case: "bsv-transction-response",
        data: JSON.stringify({
          sendBsvRes,
          type,
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
        window.parent.postMessage({ case: "user-data", data: JSON.stringify(user) }, "*");
      } else {
        console.log("user not avliable");
        window.parent.postMessage({ case: "user-data", data: null }, "*");
      }
    });
  };

  return <div></div>;
}

export default PayButton;
