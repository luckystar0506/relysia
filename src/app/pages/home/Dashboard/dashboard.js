import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import CircularProgress from "@material-ui/core/CircularProgress";

import UpdateWallet from "./updateWallet";
import { DB1 } from "../../../../index";
import Activity from "./Activity";
import RequestBSV from "./requestBsv";
import SendBSV from "./sendBsv";
import RefreshIcon from "@material-ui/icons/Refresh";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let field1 = "";
let field2 = "";
let field3 = "";

const useStyles = makeStyles((theme) => ({
  walletEleCon: {
    borderRadius: 15,
    height: 180,
    width: "80%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "12px 18px",
    marginBottom: 12,
    [theme.breakpoints.down("sm")]: {
      height: 150,
      width: "100%",
      minWidth: 200,
    },
  },
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

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("sm"));
  const { enqueueSnackbar } = useSnackbar();
  const [walletsList, setwalletsList] = useState([]);
  const [selectedActivityState, setselectedActivityState] = useState(2);
  const [diologueState, setdiologueState] = useState(false);
  const [generatingWalletKeys, setgeneratingWalletKeys] = useState(false);
  const [totalBalances, settotalBalances] = useState({
    btcBal: 0,
    dollarBal: 0,
  });
  const [activities, setactivities] = useState([]);
  const [bsvRate, setbsvRate] = useState(100);
  const [refreshBalances, setrefreshBalances] = useState(false);

  useEffect(() => {
    if (props.user && props.user.uid) {
      console.log("run", props.user);
      getUserWallets();
    } else {
      props.history.push("/auth");
    }
  }, [props.user]);

  useEffect(() => {
    DB1.ref("stats/market_price_usd")
      .once("value")
      .then((snap) => {
        if (snap.val()) {
          setbsvRate(snap.val());
        }
      });
  }, []);

  const getUserWallets = async () => {
    let walletListAPI = firebase.functions().httpsCallable("getWalletBalances");
    let walletListRes = await walletListAPI();
    console.log("walletListRes", walletListRes);
    if (walletListRes && walletListRes.data && walletListRes.data.status === "success") {
      setwalletsList(Object.values(walletListRes.data.data));
      if (walletListRes.data.totalBalances) {
        settotalBalances(walletListRes.data.totalBalances);
      }
      if (walletListRes.data.totalBalances) {
        setactivities(walletListRes.data.transctions);
      }
    }
    if (walletListRes) {
      return null;
    }
  };

  const submitCreateWallet = async () => {
    setgeneratingWalletKeys(true);
    let pass = true;

    //validation vals
    if (field1 === "") {
      pass = false;
      enqueueSnackbar("Please provide Wallet Name", { variant: "error" });
    }
    if (field2 === "") {
      pass = false;
      enqueueSnackbar("Please provide Wallet Password", { variant: "error" });
    } else if (field2.length <= 5) {
      pass = false;
      enqueueSnackbar("Wallet Password should contain atleast 6 chracters", { variant: "error" });
    }
    if (pass) {
      enqueueSnackbar("Generating Wallet Keys..", { variant: "info" });
      try {
        let createWalletAPI = firebase.functions().httpsCallable("createWallet");
        let walletRes = await createWalletAPI({
          title: field1,
          password: field2,
        });

        if (walletRes && walletRes.data && walletRes.data.status === "success") {
          //updating local state
          let modifiedObj = [...walletsList];
          modifiedObj.push(walletRes.data.walletObj);
          setwalletsList(modifiedObj);

          setgeneratingWalletKeys(false);
          setdiologueState(false);
          enqueueSnackbar("Wallet created Successfully!", { variant: "success" });
        } else {
          setgeneratingWalletKeys(false);
          enqueueSnackbar("An error occures, Try again!", { variant: "error" });
        }
      } catch (err) {
        console.log("catch err", err);
        setgeneratingWalletKeys(false);
        enqueueSnackbar("An error occures, Try again!", { variant: "error" });
      }
    } else {
      setgeneratingWalletKeys(false);
      return null;
    }
  };

  const getRefreshBalances = async () => {
    setrefreshBalances(true);
    await getUserWallets();
    setrefreshBalances(false);
  };

  const EditDialog = (
    <Dialog
      open={diologueState}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="edit-dialog-slide-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle style={{ paddingBottom: 1 }}>New Wallet Details</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: 0 }}>After the creation of Wallet, details can't be change.</DialogContentText>
        <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
          <TextField
            defaultValue=""
            onChange={(e) => {
              field1 = e.target.value;
            }}
            label="Wallet Name"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 15, marginBottom: 10 }}
          />
          <TextField
            defaultValue=""
            onChange={(e) => {
              field2 = e.target.value;
            }}
            label="Wallet Password"
            variant="outlined"
            type="password"
            className={`custom-padding`}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setdiologueState(false)} color="primary">
          Cancel
        </Button>

        <Button onClick={submitCreateWallet} color="primary">
          {generatingWalletKeys ? <CircularProgress color="primary" size={20} thickness={4} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );

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
        <Grid item xs={12} md={6}>
          <div>
            <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1 }}>
              Wallets
            </Typography>
            <div style={{ marginTop: 12, marginBottom: 20 }}>
              {walletsList.map((item, index) => {
                return (
                  <Paper
                    className={classes.walletEleCon}
                    style={{
                      backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    key={item.id}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        component="h3"
                        variant="subtitle1"
                        style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden ", textOverflow: "ellipsis" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="h3" style={{ fontSize: "2.5rem", marginLeft: "auto", fontWeight: 600 }}>
                        ₿
                      </Typography>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <Typography component="h4" variant="h4">
                        {item.btcBal} BSV
                      </Typography>
                      <Typography component="h4" variant="subtitle2">
                        ${item.dollarBal.toFixed(4)}
                      </Typography>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SendBSV walletObj={item} bsvRate={bsvRate} />
                      <RequestBSV walletObj={item} />
                      <UpdateWallet
                        userID={props.user ? props.user.uid : ""}
                        walletDetails={item}
                        walletIndex={index}
                        walletsList={walletsList}
                        setwalletsList={setwalletsList}
                      />
                    </div>
                  </Paper>
                );
              })}
              {walletsList.length === 0 && (
                <Typography variant="caption" color="textSecondary">
                  You didnt have any wallet yet
                </Typography>
              )}
            </div>
            <Button
              startIcon={<AddRoundedIcon />}
              color="primary"
              variant="contained"
              style={{ marginLeft: 10, borderRadius: 50, paddingLeft: 25, paddingRight: 25 }}
              onClick={() => {
                field1 = "";
                field2 = "";
                setdiologueState(true);
              }}
            >
              Add new Wallet
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ marginTop: matchesMD ? 30 : 0 }}>
            <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1 }}>
              Account
            </Typography>
            <div style={{ marginTop: 12, marginBottom: 20 }}>
              <Paper className={classes.accountBox1}>
                <IconButton className={classes.menuIcon}>
                  <MoreVertIcon />
                </IconButton>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <Typography
                      style={{ color: theme.palette.textColors.para1, fontWeight: 500, display: "flex", alignItems: "center" }}
                      variant="subtitle1"
                    >
                      <span> Your ballance</span>
                      <div>
                        <IconButton
                          disabled={refreshBalances}
                          onClick={getRefreshBalances}
                          size="small"
                          color="primary"
                          style={{ marginLeft: 10 }}
                        >
                          {refreshBalances ? (
                            <CircularProgress size={16} thickness={4} />
                          ) : (
                            <RefreshIcon style={{ height: 17, width: 17 }} />
                          )}
                        </IconButton>
                      </div>
                    </Typography>
                    <div style={{ marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                      <Typography style={{ color: theme.palette.textColors.para1, fontWeight: 600 }} variant="h5">
                        ${totalBalances.dollarBal.toFixed(4)}
                      </Typography>
                      <Typography style={{ color: theme.palette.textColors.para1, marginTop: -2 }} variant="caption" component="p">
                        Avaliable
                      </Typography>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                  <Button
                    color={selectedActivityState === 0 ? "secondary" : "default"}
                    variant="contained"
                    className={classes.accountBox1Btn}
                    onClick={() => {
                      setselectedActivityState(0);
                    }}
                  >
                    Deposit
                  </Button>
                  <Button
                    color={selectedActivityState === 1 ? "secondary" : "default"}
                    variant="contained"
                    className={classes.accountBox1Btn}
                    onClick={() => {
                      setselectedActivityState(1);
                    }}
                  >
                    Withdraw
                  </Button>
                  <Button
                    color={selectedActivityState === 2 ? "secondary" : "default"}
                    variant="contained"
                    className={classes.accountBox1Btn}
                    onClick={() => {
                      setselectedActivityState(2);
                    }}
                  >
                    Activity
                  </Button>
                </div>
              </Paper>
            </div>
          </div>
          <div style={{ marginTop: 30 }}>
            <Activity activities={activities} bsvRate={bsvRate} selectedActivityState={selectedActivityState} />
          </div>
        </Grid>
      </Grid>
      {EditDialog}
    </div>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps, {})(Dashboard);
