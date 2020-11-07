import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import ChipInput from "material-ui-chip-input";
import { TitleComponent } from "../../../partials/content/helmetComponent";
import { DB1 } from "../../../../index";
import { makeStyles } from "@material-ui/core/styles";
import { updateUserWalletsData, updateUserTokensData } from "../../../store/ducks/auth.duck";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Computer from "bitcoin-computer";
import { connect } from "react-redux";
import TokenSelection from "./tokenSelection";
import TokenCreationForm from "./tokenCreationForm";

var firebase = require("firebase");

const useStyles = makeStyles((theme) => ({}));

function CreateToken(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [walletsList, setwalletsList] = useState([]);
  const [computer, setComputer] = useState(null);
  const [tokenType, settokenType] = useState(null);

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

  useEffect(() => {
    if (walletsList && walletsList.length > 0 && !computer && !props.tokensData) {
      let computerArray = [];
      walletsList.map((walletItem, index) => {
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
      console.log("computerArray", computerArray);
      setComputer(computerArray);
      props.updateUserTokensData(computerArray);
    } else if (walletsList && walletsList.length > 0 && !computer) {
      setComputer(props.tokensData);
    }
  }, [walletsList, computer]);

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

  let openTab = (
    <Grid item lg={3} md={4} xs={12}>
      <Paper style={{ padding: 15, backgroundColor: "#1F1E2E", color: "#fff", zIndex: 150 }}>
        <img className="fadeIn" style={{ height: 300, maxWidth: "100%" }} alt="open" src={"/media/images/public.jpg"} />
        <h2> Open </h2>
        <h4 style={{ color: "#d1cec2" }}> Unlimited Contributors</h4>
        <p style={{ margin: 40, height: 50 }}> Public Tokens allow everyone to create nodes and comment to topics. </p>

        {!tokenType && (
          <Button variant="contained" style={{ padding: 10, margin: 10 }} color="primary" onClick={() => settokenType("Open")}>
            Select
          </Button>
        )}
        {tokenType && (
          <Button variant="contained" style={{ padding: 10, margin: 10 }} color="primary" onClick={() => settokenType(null)}>
            Edit
          </Button>
        )}
      </Paper>
    </Grid>
  );

  let teamTab = (
    <Grid item lg={3} md={4} xs={12}>
      <Paper style={{ padding: 15, backgroundColor: "#1F1E2E", color: "#fff", zIndex: 120 }}>
        <img className="fadeIn" style={{ height: 300, paddingTop: 30, maxWidth: "100%" }} alt="team" src={"/media/images/team.jpg"} />
        <h2> Team </h2>
        <h4 style={{ color: "#d1cec2" }}> Invited Users </h4>
        <p style={{ margin: 40, height: 50 }}>
          Team Tokens have restricted access for your team members. You can open them at a later point.
        </p>
        {!tokenType && (
          <Button variant="contained" style={{ padding: 10, margin: 10 }} color="primary" onClick={() => settokenType("Team")}>
            Select
          </Button>
        )}
        {tokenType && (
          <Button variant="contained" style={{ padding: 10, margin: 10 }} color="primary" onClick={() => settokenType(null)}>
            Edit
          </Button>
        )}
      </Paper>
    </Grid>
  );

  let privateTab = (
    <Grid item lg={3} md={4} xs={12}>
      <Paper style={{ padding: 15, backgroundColor: "#1F1E2E", color: "#fff", zIndex: 100 }}>
        <img
          className="fadeIn"
          style={{ height: 300, paddingTop: 30, paddingRight: 50, maxWidth: "100%" }}
          alt="private"
          src={"/media/images/solo.jpg"}
        />
        <h2> Private </h2>
        <h4 style={{ color: "#d1cec2" }}> Only You</h4>
        <p style={{ margin: 40, height: 50 }}>Private Tokens are ideal to build an overview of topics that only you have access to.</p>
        {!tokenType && (
          <Button variant="contained" style={{ padding: 10, margin: 10 }} color="primary" onClick={() => settokenType("Private")}>
            Select
          </Button>
        )}
        {tokenType && (
          <Button variant="contained" style={{ padding: 10, margin: 10 }} color="primary" onClick={() => settokenType(null)}>
            Edit
          </Button>
        )}
      </Paper>
    </Grid>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D0C1D",
        textAlign: "center",
      }}
    >
      <TitleComponent title="Token Creation" />
      <div style={{ maxWidth: 1380, margin: "0px auto", marginTop: 10 }}>
        <div style={{ padding: 20, color: "white" }}>
          <h1> Create a new Token </h1>
        </div>

        {tokenType ? (
          <TokenCreationForm
            computer={computer}
            walletsList={walletsList}
            openTab={openTab}
            teamTab={teamTab}
            privateTab={privateTab}
            tokenType={tokenType}
            history={props.history}
            userEmail={props.user ? props.user.email : "-"}
          />
        ) : (
          <TokenSelection openTab={openTab} teamTab={teamTab} privateTab={privateTab} tokenType={tokenType} settokenType={settokenType} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth: { user, walletsData, tokensData } }) => ({
  user,
  walletsData,
  tokensData,
});

export default connect(mapStateToProps, { updateUserWalletsData, updateUserTokensData })(CreateToken);
