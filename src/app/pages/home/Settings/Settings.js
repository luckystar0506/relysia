import React, { useEffect } from "react";

import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import WithdrawlComponent from "../../../widgets/Withdrawl";
import UpdatePortraitComponent from "../../../widgets/uploadPortrait";
import { connect } from "react-redux";
import { updateProfilePicFunc } from "../../../store/ducks/auth.duck";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withSnackbar } from "notistack";
import { TitleComponent } from "../../../partials/content/helmetComponent";
import { DB1 } from "../../../../index";
import Lottie from "react-lottie";
import triangleData from "../lottieFiles/doubleTriangle.json";
import flagData from "../lottieFiles/flag.json";
import triangleFlag from "../lottieFiles/triangleFlag.json";
import yellowData from "../lottieFiles/yellowDots.json";
import orangeTrianglesData from "../lottieFiles/triangles.json";
import circleData from "../lottieFiles/circles2.json";
import { toAbsoluteUrl } from "../../../../_metronic/utils/utils";
import Collapse from "@material-ui/core/Collapse";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

const styles = (theme) => ({
  leftImage: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  cardDicRight: {
    textAlign: "center",
    color: "#473F3F",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  cardDicCon: {
    padding: "30px 40px",
    marginBottom: 20,
  },
  blueBtn: {
    backgroundColor: "#E3F6FF",
    color: "#000000",
    borderRadius: "0px",
    marginTop: 10,
  },
  certificateImgCon: {
    display: "flex",
    width: "30%",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    "& p": {
      padding: "0px 10px",
    },
  },
  certificateCollapse: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    alignItems: "stretch",
  },
  boxDivStyle: { borderRadius: 15, width: "100%", padding: "20px" },
  accountBoxBtn: {
    borderRadius: 50,
    width: "80%",
    marginBottom: 10,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      usernameChange: "",
      openMnemonic: false,
      tags: [],
      description: "",
      newEmail: "",
      mnemonic: "",
      hdPrivateKey: "",
      satoshis: "",
      address: "",
      hdPublicKey: "",
      totalIncome: 0,
      nTransactions: 0,
      balance: 0,
      bsvPrice: 100,
      txoSet: [],
      profileImage: null,
      refreshLoader: false,
      userEmail: "",
      userID: "",
      newEmailError: false,
      newEmailPassword: "",
      showLoader: false,
      oldPassword: "",
      newPassword: "",
      delPassword: "",
      userDisplayName: "",
    };
  }

  componentDidMount() {
    if (this.props.user) {
      console.log("cc", this.props.user);
      var userID = this.props.user.uid;

      this.setState({
        userDisplayName: this.props.user.displayName,
        profileImage: this.props.user.photoURL,
        userEmail: this.props.user.email,
        userID: userID,
      });
      DB1.ref("KeyStore/" + userID).on("value", (snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.hasChild("hdPrivateKey")) {
            var hdPrivateKey = snapshot.val().hdPrivateKey;
            var hdPublicKey = snapshot.val().hdPublicKey;
            var address = snapshot.val().address;
            var mnemonic = snapshot.val().mnemonic;
            var balance = snapshot.val().balance;
            var nTransactions = snapshot.val().nTransactions;
            var totalIncome = snapshot.val().totalIncome;
            var txoSet = snapshot.val().txoSet;
            this.setState({
              hdPrivateKey,
              hdPublicKey,
              address,
              mnemonic,
              balance,
              nTransactions,
              totalIncome,
              txoSet,
            });
          }
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

      this.updateWithdrawl();
    } else {
      this.props.history.push("/");
    }
  }

  getactivitesAndNotif = async () => {};

  updateWithdrawl = () => {
    let getMetrices = firebase.functions().httpsCallable("getMetrices");
    getMetrices();
  };

  onEmailChange = (e) => {
    this.setState({
      newEmail: e.target.value,
      newEmailError: !validateEmail(e.target.value),
    });
  };

  onNewPasswordConfirmationChange = (event, value) => {
    this.setState({
      newPasswordConfirmation: value,
    });
  };

  submitEmailChange = () => {
    this.setState({
      showLoader: true,
    });
    const { newEmail, newEmailPassword, userEmail } = this.state;
    if (newEmailPassword.length === 0) {
      this.props.enqueueSnackbar("Please provide a correct paeeword!", {
        variant: "error",
      });
      this.setState({
        showLoader: false,
      });
    } else if (validateEmail(newEmail)) {
      let that = this;
      //signning the user
      firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, newEmailPassword)
        .then(() => {
          //updating email
          var user = firebase.auth().currentUser;
          return user.updateEmail(newEmail);
        })
        .then(function() {
          // Update successful.
          that.setState({
            open3: false,
            userEmail: newEmail,
            showLoader: false,
          });
          that.props.enqueueSnackbar("Email Updated Successfully!", {
            variant: "success",
          });
        })
        .catch(function(error) {
          that.props.enqueueSnackbar(error.message, { variant: "error" });
          that.setState({
            showLoader: false,
          });
        });
    } else {
      this.props.enqueueSnackbar("Please provide a valid Email address!", {
        variant: "error",
      });
      this.setState({
        showLoader: false,
      });
    }
  };

  submitUsernameChange = () => {
    this.setState({
      showLoader: true,
    });
    let that = this;

    if (this.state.usernameChange === "") {
      this.props.enqueueSnackbar("Please provide a UserName!", {
        variant: "error",
      });
      this.setState({
        showLoader: false,
      });
    } else {
      var updateUser = firebase.auth().currentUser;
      updateUser
        .updateProfile({
          displayName: this.state.usernameChange,
        })
        .then(function() {
          that.setState({
            open4: false,
            userDisplayName: that.state.usernameChange,
            showLoader: false,
          });
          that.props.enqueueSnackbar("UserName Updated Successfully!", {
            variant: "success",
          });
        })
        .catch(function(error) {
          that.setState({
            showLoader: false,
          });
          that.props.enqueueSnackbar(error.message, {
            variant: "error",
          });
        });
    }
  };

  submitChangePassword = () => {
    this.setState({
      showLoader: true,
    });
    const { oldPassword, newPassword, userEmail } = this.state;
    if (newPassword.length === 0 || oldPassword.length === 0) {
      this.props.enqueueSnackbar("Please provide a correct value for each paeewords!", { variant: "error" });
      this.setState({
        showLoader: false,
      });
    } else {
      let that = this;
      //signning the user
      firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, oldPassword)
        .then(() => {
          //updating email
          var user = firebase.auth().currentUser;
          return user.updatePassword(newPassword);
        })
        .then(function() {
          // Update successful.
          that.setState({ open: false, showLoader: false });
          that.props.enqueueSnackbar("Password Updated Successfully!", {
            variant: "success",
          });
        })
        .catch(function(error) {
          that.props.enqueueSnackbar(error.message, { variant: "error" });
          that.setState({
            showLoader: false,
          });
        });
    }
  };

  deleteAccount = () => {
    this.setState({
      showLoader: true,
    });
    const { delPassword, userEmail } = this.state;
    if (delPassword.length === 0) {
      this.props.enqueueSnackbar("Please provide the correct paeeword!", {
        variant: "error",
      });
      this.setState({
        showLoader: false,
      });
    } else {
      let that = this;
      //signning the user
      firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, delPassword)
        .then(() => {
          //updating email
          var user = firebase.auth().currentUser;
          return user.delete();
        })
        .then(function() {
          // Update successful.
          that.setState({ open1: false, showLoader: false });
          that.props.enqueueSnackbar("Account Deleted!", {
            variant: "success",
          });
          // that.props.history.push("/");
        })
        .catch(function(error) {
          that.props.enqueueSnackbar(error.message, { variant: "error" });
          that.setState({
            showLoader: false,
          });
        });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.updateProfilePic !== this.props.updateProfilePic) {
      if (this.props.updateProfilePic === true) {
        this.setState({ profileImage: this.props.profilePicUrl });
      }
    }
  }

  render() {
    const { classes } = this.props;

    var user = firebase.auth().currentUser;
    var userName;

    if (user != null) {
      userName = user.displayName;
    } else {
      userName = "not logged in";
    }

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
        <TitleComponent title={this.state.userDisplayName} />

        <Grid container spacing={0} style={{ height: "100%" }}>
          <Grid container item xs={12} justify="space-between" spacing={5}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.boxDivStyle}>
                <Grid container spacing={1} justify="space-between" style={{ alignItems: "center", marginBottom: "10px" }}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* //#change */}
                      {true && (
                        //this.state.profileImage
                        <div>
                          <img
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                            }}
                            //src={this.state.profileImage}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
                            alt="profileImage"
                          />
                        </div>
                      )}
                      <div style={{ marginLeft: 10 }}>
                        <b style={{ fontSize: 18 }}> {userName} </b>
                        <br />
                        <span style={{ wordBreak: "break-word" }}>{this.state.userEmail}</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={12}></Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item sm={6} style={{ textAlign: "center" }}>
                    <Button
                      onClick={() =>
                        this.setState({
                          open3: true,
                          newEmail: "",
                          newEmailPassword: "",
                        })
                      }
                      color="secondary"
                      variant="contained"
                      className={classes.accountBoxBtn}
                    >
                      <FormattedMessage id="PRFILE.CHANGEEMAIL" defaultMessage="Change Email" />
                    </Button>
                    <Button
                      onClick={() =>
                        this.setState({
                          open: true,
                          oldPassword: "",
                          newPassword: "",
                        })
                      }
                      color="secondary"
                      variant="contained"
                      className={classes.accountBoxBtn}
                    >
                      <FormattedMessage id="PRFILE.CHANGEPASSWORD" defaultMessage="Change Password" />
                    </Button>
                    <Button
                      onClick={() =>
                        this.setState({
                          open4: true,
                          usernameChange: this.state.userDisplayName,
                        })
                      }
                      color="secondary"
                      variant="contained"
                      className={classes.accountBoxBtn}
                    >
                      <FormattedMessage id="PRFILE.CHANGEUSERNAME" defaultMessage="Change Username" />
                    </Button>
                  </Grid>
                  <Grid item sm={6} style={{ textAlign: "center" }}>
                    <UpdatePortraitComponent btnStyles={classes.accountBoxBtn} />
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.accountBoxBtn}
                      onClick={() => this.setState({ open1: true, delPassword: "" })}
                    >
                      <FormattedMessage id="PRFILE.DELETEACC" defaultMessage="Delete Account" />
                    </Button>
                  </Grid>
                </Grid>

                <Dialog
                  onEscapeKeyDown={() => this.setState({ open: false })}
                  open={this.state.open}
                  onClose={() => this.setState({ open: false })}
                  aria-labelledby="password-form"
                >
                  <DialogTitle id="form-dialog-title">
                    <FormattedMessage id="PRFILE.DIALOG2.HEAD" defaultMessage="Password" />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <FormattedMessage
                        id="PRFILE.DIALOG2.TEXT"
                        defaultMessage="To change your password, type in and confirm your new
                            password below."
                      />
                    </DialogContentText>

                    <TextField
                      autoFocus
                      type="password"
                      margin="dense"
                      label="Old Password"
                      floatingLabelText="Old Password"
                      floatingLabelStyle={{ fontWeight: "normal" }}
                      fullWidth
                      value={this.state.oldPassword}
                      onChange={(e) => {
                        this.setState({
                          oldPassword: e.target.value,
                        });
                      }}
                    />

                    <TextField
                      type="password"
                      margin="dense"
                      label="New Password"
                      floatingLabelText="New Password"
                      floatingLabelStyle={{ fontWeight: "normal" }}
                      fullWidth
                      value={this.state.newPassword}
                      onChange={(e) => {
                        this.setState({
                          newPassword: e.target.value,
                        });
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.setState({ open: false })} color="primary">
                      Cancel
                    </Button>

                    <div
                      style={{
                        width: "10%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.showLoader ? (
                        <CircularProgress color="primary" size={20} />
                      ) : (
                        <Button
                          onClick={() => {
                            this.submitChangePassword();
                          }}
                          color="primary"
                        >
                          Change
                        </Button>
                      )}
                    </div>
                  </DialogActions>
                </Dialog>
                <Dialog
                  onEscapeKeyDown={() => this.setState({ open3: false })}
                  open={this.state.open3}
                  onClose={() => this.setState({ open3: false })}
                  aria-labelledby="email-form"
                >
                  <DialogTitle id="form-dialog-title">
                    <FormattedMessage id="PRFILE.DIALOG1.HEAD" defaultMessage="Correspondence" />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <FormattedMessage
                        id="PRFILE.DIALOG1.TEXT"
                        defaultMessage="To change your email, please enter a new email address
                            with current password here."
                      />
                    </DialogContentText>

                    <TextField
                      autoFocus
                      type="password"
                      margin="dense"
                      id="newEmailPassword"
                      label="Current Password"
                      floatingLabelStyle={{ fontWeight: "normal" }}
                      fullWidth
                      onChange={(e) => {
                        this.setState({ newEmailPassword: e.target.value });
                      }}
                      value={this.state.newEmailPassword}
                    />
                    <TextField
                      type="email"
                      margin="dense"
                      id="name"
                      label="New Email Address"
                      floatingLabelStyle={{ fontWeight: "normal" }}
                      fullWidth
                      onChange={this.onEmailChange}
                      error={this.state.newEmailError}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.setState({ open3: false })} color="primary">
                      <FormattedMessage id="PRFILE.DIALOG2.CANCEL" defaultMessage="Cancel" />
                    </Button>
                    <div
                      style={{
                        width: "10%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.showLoader ? (
                        <CircularProgress color="primary" size={20} />
                      ) : (
                        <Button onClick={() => this.submitEmailChange()} color="primary">
                          <FormattedMessage id="PRFILE.DIALOG2.Change" defaultMessage="Change" />
                        </Button>
                      )}
                    </div>
                  </DialogActions>
                </Dialog>
                <Dialog
                  onEscapeKeyDown={() => this.setState({ open1: false })}
                  open={this.state.open1}
                  onClose={() => this.setState({ open1: false })}
                  aria-labelledby="delete-form"
                >
                  <DialogTitle id="form-dialog-title">
                    <FormattedMessage id="PRFILE.DIALOG3.HEAD" defaultMessage="Delete Account" />
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <FormattedMessage id="PRFILE.DIALOG3.TEXT" defaultMessage="Warning: Deleting this account is irreversible." />
                    </DialogContentText>
                    <TextField
                      autoFocus
                      type="password"
                      margin="dense"
                      id="delete-password"
                      label="Current Password"
                      floatingLabelStyle={{ fontWeight: "normal" }}
                      fullWidth
                      onChange={(e) => {
                        this.setState({ delPassword: e.target.value });
                      }}
                      value={this.state.delPassword}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() =>
                        this.setState({
                          open1: false,
                        })
                      }
                      color="primary"
                    >
                      <FormattedMessage id="PRFILE.DIALOG3.Cancel" defaultMessage="Cancel" />
                    </Button>

                    <div
                      style={{
                        width: "20%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.showLoader ? (
                        <CircularProgress color="primary" size={20} />
                      ) : (
                        <Button color="primary" onClick={this.deleteAccount}>
                          <FormattedMessage id="PRFILE.DIALOG3.Confirm" defaultMessage="Confirm" />
                        </Button>
                      )}
                    </div>
                  </DialogActions>
                </Dialog>
                <Dialog
                  onEscapeKeyDown={() => this.setState({ open4: false })}
                  open={this.state.open4}
                  onClose={() => this.setState({ open4: false })}
                  aria-labelledby="username-form"
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle id="username-dialog-title">
                    <FormattedMessage id="PRFILE.DIALOG4.HEAD" defaultMessage="Update Username" />
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="newUsername"
                      label="User name"
                      floatingLabelStyle={{ fontWeight: "normal" }}
                      fullWidth
                      onChange={(e) => {
                        this.setState({ usernameChange: e.target.value });
                      }}
                      value={this.state.usernameChange}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => this.setState({ open4: false })} color="primary">
                      <FormattedMessage id="PRFILE.DIALOG4.Cancel" defaultMessage="Cancel" />
                    </Button>
                    <div
                      style={{
                        width: "10%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.showLoader ? (
                        <CircularProgress color="primary" size={20} />
                      ) : (
                        <Button onClick={() => this.submitUsernameChange()} color="primary">
                          <FormattedMessage id="PRFILE.DIALOG4.Change" defaultMessage="Change" />
                        </Button>
                      )}
                    </div>
                  </DialogActions>
                </Dialog>
              </Paper>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              {" "}
              <Paper className={classes.boxDivStyle}>
                <WithdrawlComponent
                  mnemonic={this.state.mnemonic}
                  address={this.state.address}
                  opData={["Wallet", "withdrawl"]}
                  hdPublicKey={this.state.hdPublicKey}
                  hdPrivateKey={this.state.hdPrivateKey}
                  txoSet={this.state.txoSet}
                  balance={this.state.balance}
                  bsvPrice={this.state.bsvPrice}
                  userID={this.state.userID}
                />
              </Paper>
            </Grid>
         */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { updateProfilePic, profilePicUrl, user } }) => ({
  updateProfilePic,
  profilePicUrl,
  user,
});

export default withStyles(styles)(withSnackbar(connect(mapStateToProps, { updateProfilePicFunc })(Settings)));
