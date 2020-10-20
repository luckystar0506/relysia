/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from "react";
import { toAbsoluteUrl } from "../../../_metronic";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import { DB1 } from "../../../index";
import { updateProfilePicFunc } from "../../store/ducks/auth.duck";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withSnackbar } from "notistack";
import RefreshIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

class QuickPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      userBalance: 0,
      bsvPrice: 100,
      privateKey: "",
      publicKey: "",
      address: "",
      txoSet: [],
      copyText: "",
      copied: false,
      refresh: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userData: user });

        DB1.ref("KeyStore/" + user.uid).on("value", (snapshot) => {
          if (snapshot.val()) {
            this.setState({
              userBalance: snapshot.val().balance ? snapshot.val().balance : "",
              privateKey: snapshot.val().hdPrivateKey ? snapshot.val().hdPrivateKey : "",
              publicKey: snapshot.val().hdPublicKey ? snapshot.val().hdPublicKey : "",
              address: snapshot.val().address ? snapshot.val().address : "",
              txoSet: snapshot.val().txoSet ? snapshot.val().txoSet : [],
            });
          }
        });
      }
    });

    //fetching price data
    DB1.ref("stats/market_price_usd")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          this.setState({
            bsvPrice: snapshot.val(),
          });
        }
      });
  };

  refreshMetrices = () => {
    this.setState({ refresh: true });
    let getMetrices = firebase.functions().httpsCallable("getMetrices");
    getMetrices();
    setTimeout(() => {
      this.setState({ refresh: false });
    }, 3000);
  };

  render() {
    return (
      <div id="kt_quick_panel" className="kt-quick-panel">
        <a href="#" className="kt-quick-panel__close" id="kt_quick_panel_close_btn">
          <i className="flaticon2-delete " />
        </a>
        <div>
          <div
            className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("media/bg/bg-11.jpg")})`,
              height: 60,
            }}
          >
            <div className="kt-user-card__name">
              Wallet Data
              <IconButton color="secondary" onClick={this.refreshMetrices}>
                {this.state.refresh ? (
                  <CircularProgress color="secondary" size={14} thickness={4.2} />
                ) : (
                  <RefreshIcon style={{ fontSize: 18 }} />
                )}
              </IconButton>
            </div>
          </div>
          <div>
            <div style={{ width: "100%", padding: 20, display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" style={{ width: "60%", fontWeight: 600 }}>
                Wallet Balance in Satoshi
              </Typography>
              <Typography variant="subtitle1" color="secondary" style={{ textAlign: "right", marginLeft: "auto", fontWeight: 600 }}>
                {this.state.userBalance}
              </Typography>
            </div>
            <Divider />
            <div style={{ width: "100%", padding: 20, display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" style={{ width: "60%", fontWeight: 600 }}>
                Wallet Balance in $
              </Typography>
              <Typography variant="subtitle1" color="secondary" style={{ textAlign: "right", marginLeft: "auto", fontWeight: 600 }}>
                $ {((this.state.userBalance * this.state.bsvPrice) / 100000000).toFixed(2)}
              </Typography>
            </div>
            <Divider />
            <div
              className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
              style={{
                backgroundImage: `url(${toAbsoluteUrl("media/bg/bg-11.jpg")})`,
                height: 60,
              }}
            >
              <div className="kt-user-card__name"> Wallet Keys</div>
            </div>
            <Divider />
            <div style={{ width: "100%", padding: 20, display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" style={{ width: "60%", fontWeight: 600 }}>
                Private Key
                <CopyToClipboard
                  text={this.state.privateKey}
                  onCopy={() => this.props.enqueueSnackbar("Private Key has been copied", { variant: "info" })}
                >
                  <IconButton size="small">
                    <FileCopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </Typography>

              <Typography variant="subtitle2" color="secondary" style={{ textAlign: "left", marginLeft: "auto", wordBreak: "break-word" }}>
                {this.state.privateKey}
              </Typography>
            </div>
            <div style={{ width: "100%", padding: 20, display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" style={{ width: "60%", fontWeight: 600 }}>
                Public Key
                <CopyToClipboard
                  text={this.state.publicKey}
                  onCopy={() => this.props.enqueueSnackbar("Public Key has been copied", { variant: "info" })}
                >
                  <IconButton size="small">
                    <FileCopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </Typography>

              <Typography variant="subtitle2" color="secondary" style={{ textAlign: "left", marginLeft: "auto", wordBreak: "break-word" }}>
                {this.state.publicKey}
              </Typography>
            </div>
            <div style={{ width: "100%", padding: 20, display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" style={{ width: 75, marginRight: 15, fontWeight: 600 }}>
                <span>Address </span>
                <CopyToClipboard
                  text={this.state.address}
                  onCopy={() => this.props.enqueueSnackbar("Address Key has been copied", { variant: "info" })}
                >
                  <IconButton size="small">
                    <FileCopyIcon />
                  </IconButton>
                </CopyToClipboard>
              </Typography>

              <Typography variant="subtitle2" color="secondary" style={{}}>
                {this.state.address}
              </Typography>
            </div>
            <div
              className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
              style={{
                backgroundImage: `url(${toAbsoluteUrl("media/bg/bg-11.jpg")})`,
                height: 60,
              }}
            >
              <div className="kt-user-card__name"> UTXO Sets </div>
            </div>
            <Divider />
            <table style={{ width: "100%", tableLayout: "fixed" }}>
              <tbody>
                <tr>
                  <th style={{ width: "12%", wordBreak: "break-word", backgroundColor: "#F8F8FF", paddingLeft: 3 }}> value </th>
                  <th style={{ width: "8%", wordBreak: "break-word", paddingLeft: 3 }}> vout </th>
                  <th style={{ width: "40%", wordBreak: "break-word", backgroundColor: "#F8F8FF", paddingLeft: 3 }}> txid </th>
                  <th style={{ width: "40%", wordBreak: "break-word", paddingLeft: 3 }}> scriptPubKey </th>
                </tr>
                {this.state.txoSet.map((item, index) => {
                  return (
                    <tr key={index + "txo"} style={{ height: 70 }}>
                      <td
                        style={{
                          width: "12%",
                          wordBreak: "break-word",
                          verticalAlign: "baseline",
                          marginTop: 10,
                          paddingLeft: 3,
                          backgroundColor: "#F8F8FF",
                        }}
                      >
                        {item.value}
                      </td>
                      <td style={{ width: "8%", wordBreak: "break-word", verticalAlign: "baseline", marginTop: 10, paddingRight: 3 }}>
                        {item.vout}
                      </td>
                      <td
                        style={{
                          width: "40%",
                          wordBreak: "break-word",
                          verticalAlign: "baseline",
                          marginTop: 10,
                          paddingRight: 3,
                          backgroundColor: "#F8F8FF",
                        }}
                      >
                        {item.txid}
                      </td>
                      <td
                        style={{
                          width: "40%",
                          wordBreak: "break-word",
                          verticalAlign: "baseline",
                          marginTop: 10,
                          paddingRight: 5,
                          paddingLeft: 3,
                        }}
                      >
                        {item.scriptPubKey}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
              style={{
                backgroundImage: `url(${toAbsoluteUrl("media/bg/bg-11.jpg")})`,
                height: 60,
              }}
            >
              <div className="kt-user-card__name"> Explorer </div>
            </div>
            <Button
              target="_blank"
              href={"https://whatsonchain.com/address/" + this.state.address}
              style={{ backgroundColor: "orange", padding: 15, margin: 5 }}
            >
              WhatsOnChain
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user, updateProfilePic, profilePicUrl, updateTutorStatus } }) => ({
  user,
  updateProfilePic,
  profilePicUrl,
  updateTutorStatus,
});

export default withSnackbar(connect(mapStateToProps, { updateProfilePicFunc })(QuickPanel));
