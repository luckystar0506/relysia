import React, { useState, useEffect } from "react";
import ClickNHold from "react-click-n-hold";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import LoginPopup from "./auth/LoginPopup.js";
import SendBSVDialog from "./bsvPayment/sendBsv";

function App() {
  const [sendLoader, setsendLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [openLoginPopup, setopenLoginPopup] = useState(false);
  const [openBsvPopup, setopenBsvPopup] = useState(false);
  const [bsvRate, setbsvRate] = useState(100);
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    console.log("runnnn 123");
    firebase
      .database()
      .ref("stats/market_price_usd")
      .once("value")
      .then((snap) => {
        if (snap.val()) {
          setbsvRate(snap.val());
        }
      });
  }, []);

  const sendBsv = (e, enough) => {
    if (enough) {
      console.log("start transction");
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("user avliable");
          setuserData(user);
          setopenBsvPopup(true);
        } else {
          console.log("user not avliable");
          setopenLoginPopup(true);
        }
      });
    } else {
      enqueueSnackbar("Press and hold the Button for 2 seconds", { variant: "info" });
    }
  };

  const loginPopup = <LoginPopup openLoginPopup={openLoginPopup} setLoginPopup={setopenLoginPopup} sendBsv={sendBsv} />;
  const bsvPopup = (
    <SendBSVDialog
      userData={userData}
      bsvRate={bsvRate}
      openBsvPopup={openBsvPopup}
      walletObj={{}}
      setopenBsvPopup={setopenBsvPopup}
      sendBsv={sendBsv}
    />
  );

  return (
    <div className="App">
      <ClickNHold time={1.5} onEnd={sendBsv}>
        <Button variant="contained" disabled={sendLoader} color="primary">
          {sendLoader ? <CircularProgress size={20} /> : "Send BSV"}
        </Button>
      </ClickNHold>
      {loginPopup}
      {bsvPopup}
    </div>
  );
}

export default App;
