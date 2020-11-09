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
import { updateUserWalletsData, updateUserTokensData } from "../../../store/ducks/auth.duck";
import PerfectScrollbar from "react-perfect-scrollbar";
import TimeSeriesChart from "./transctionsGraph";
import Skeleton from "@material-ui/lab/Skeleton";
import TokensView from "./TokensComponent/tokensView";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  walletEleCon: {
    borderRadius: 15,
    height: 140,
    width: "80%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "12px 18px",
    margin: "0px auto 12px auto",

    [theme.breakpoints.down("sm")]: {
      height: 150,
      //   width: "100%",
      //   minWidth: 200,
    },
  },
  accountBox1: {
    borderRadius: 15,
    width: "48%",
    padding: "15px 18px",
    marginBottom: 12,
  },

  accountBox1Btn: {
    borderRadius: 50,
    margin: "5px 5px",
  },
  menuIcon: { marginLeft: "auto", position: "releative", left: 15, bottom: 10 },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  gridCon: {
    padding: "0px 5%",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 0px",
    },
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const [walletsList, setwalletsList] = useState([]);
  const [selectedActivityState, setselectedActivityState] = useState(2);
  const [diologueState, setdiologueState] = useState(false);
  const [generatingWalletKeys, setgeneratingWalletKeys] = useState(false);
  const [totalBalances, settotalBalances] = useState({
    bsvBal: 0,
    dollarBal: 0,
  });
  const [activities, setactivities] = useState([]);
  const [filteredActivites, setfilteredActivites] = useState([]);
  const [bsvRate, setbsvRate] = useState(100);
  const [refreshBalances, setrefreshBalances] = useState(false);
  const [walletName, setwalletName] = useState("");
  const [walletPassword, setwalletPassword] = useState("");
  const [selectedWallet, setselectedWallet] = useState(0);

  useEffect(() => {
    if (props.user && props.user.uid) {
      if (props.walletsData) {
        setwalletsList(Object.values(props.walletsData.data.data));
        if (props.walletsData.data.totalBalances) {
          settotalBalances(props.walletsData.data.totalBalances);
        }
        if (props.walletsData.data.transctions) {
          setactivities(props.walletsData.data.transctions);
        }
      } else {
        getUserWallets();
      }
    } else {
      console.log("dash push");

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

  //   useEffect(() => {
  //     if (walletsList && walletsList.length === 0) {
  //       setTimeout(() => {
  //         getUserWallets();
  //       }, 3000);
  //     }
  //   }, [walletsList]);

  useEffect(() => {
    //setting specificwallet activities
    let localTransctionsList = [...activities];
    let localWalletAddressList =
      walletsList && walletsList[selectedWallet] && walletsList[selectedWallet].address ? walletsList[selectedWallet].address : [];

    let sortedActivites = localTransctionsList.filter((x) => localWalletAddressList.includes(x.address));
    setfilteredActivites(sortedActivites);
  }, [selectedWallet]);

  const getUserWallets = async (refresh = false) => {
    let walletListAPI = firebase.functions().httpsCallable("getWalletBalances");
    let walletListRes = await walletListAPI();
    console.log("walletListRes", walletListRes);
    if (walletListRes && walletListRes.data && walletListRes.data.status === "success") {
      props.updateUserWalletsData(walletListRes);
      props.updateUserTokensData(null);
      setwalletsList(Object.values(walletListRes.data.data));
      if (walletListRes.data.totalBalances) {
        settotalBalances(walletListRes.data.totalBalances);
      }
      if (walletListRes.data.totalBalances) {
        setactivities(walletListRes.data.transctions);

        if (!refresh) {
          //setting specificwallet activities
          let localTransctionsList = [...walletListRes.data.transctions];
          let localWalletAddressList =
            walletListRes.data.data && walletListRes.data.data[Object.keys(walletListRes.data.data)[0]]
              ? walletListRes.data.data[Object.keys(walletListRes.data.data)[0]].address
              : [];

          let sortedActivites = localTransctionsList.filter((x) => localWalletAddressList.includes(x.address));
          setfilteredActivites(sortedActivites);
        }
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
    if (walletName === "") {
      pass = false;
      enqueueSnackbar("Please provide Wallet Name", { variant: "error" });
    }
    if (walletPassword === "") {
      pass = false;
      enqueueSnackbar("Please provide Wallet Password", { variant: "error" });
    } else if (walletPassword.length <= 5) {
      pass = false;
      enqueueSnackbar("Wallet Password should contain atleast 6 chracters", { variant: "error" });
    }
    if (pass) {
      enqueueSnackbar("Generating Wallet Keys..", { variant: "info" });
      try {
        let createWalletAPI = firebase.functions().httpsCallable("createWallet");
        let walletRes = await createWalletAPI({
          title: walletName,
          password: walletPassword,
        });

        if (walletRes && walletRes.data && walletRes.data.status === "success") {
          //updating local state
          let modifiedObj = [...walletsList];
          modifiedObj.push(walletRes.data.walletObj);
          setwalletsList(modifiedObj);

          setgeneratingWalletKeys(false);
          setdiologueState(false);
          enqueueSnackbar("Wallet created Successfully!", { variant: "success" });
          getRefreshBalances();
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
    await getUserWallets(true);
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
            onChange={(e) => {
              setwalletName(e.target.value);
            }}
            value={walletName}
            label="Wallet Name"
            variant="outlined"
            className={`custom-padding`}
            style={{ marginTop: 15, marginBottom: 10 }}
          />
          <TextField
            onChange={(e) => {
              setwalletPassword(e.target.value);
            }}
            value={walletPassword}
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
    <>
      <div
        style={{
          width: "100%",
          minWidth: 300,
          maxWidth: 1380,
          margin: "auto",
          marginTop: 20,
          padding: 10,
          paddingBottom: 50,
        }}
      >
        <Grid container className={classes.gridCon} justify="space-between">
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                margin: 20,
                marginTop: 10,
                padding: 10,
                borderRadius: 30,
                marginLeft: 0,
                paddingBottom: 20,
              }}
            >
              <div style={{ marginTop: 12, width: "100%" }}>
                {walletsList.length === 0 && (
                  <Paper
                    className={classes.walletEleCon}
                    style={{
                      backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      border: "4px solid #613aea",
                      boxSizing: "content-box",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <Typography
                        component="h3"
                        variant="subtitle1"
                        style={{
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden ",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Vaionex Walllet
                      </Typography>
                      <Typography variant="h3" style={{ fontSize: "2.5rem", marginLeft: "auto", fontWeight: 600 }}>
                        ₿
                      </Typography>
                    </div>

                    <div style={{ marginBottom: 12, cursor: "pointer" }}>
                      <Typography component="h4" variant="h4">
                        <Skeleton variant="text" style={{ borderRadius: 10, width: "60%", height: 30 }} />
                      </Typography>
                      <Typography component="h4" variant="subtitle2">
                        <Skeleton variant="text" style={{ borderRadius: 10, width: "40%", height: 22 }} />
                      </Typography>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <UpdateWallet
                        userID={props.user ? props.user.uid : ""}
                        walletDetails={null}
                        walletIndex={0}
                        walletsList={null}
                        setwalletsList={null}
                        disabled={true}
                      />
                    </div>
                  </Paper>
                )}

                {walletsList.map((item, index) => {
                  return (
                    <Paper
                      className={classes.walletEleCon}
                      style={{
                        backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        border: selectedWallet === index ? "4px solid #613aea" : "none",
                        boxSizing: "content-box",
                        //   marginLeft: selectedWallet === index ? "-4px" : "auto",
                        cursor: "pointer",
                      }}
                      key={item.id}
                      onClick={() => {
                        setselectedWallet(index);
                      }}
                      id="walletPaperComp"
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          component="h3"
                          variant="subtitle1"
                          style={{
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden ",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="h3" style={{ fontSize: "2.5rem", marginLeft: "auto", fontWeight: 600 }}>
                          ₿
                        </Typography>
                      </div>

                      <div
                        onClick={() => {
                          setselectedWallet(index);
                        }}
                        style={{ marginBottom: 12, cursor: "pointer" }}
                      >
                        <Typography component="h4" variant="h4">
                          {item.bsvBal ? (item.bsvBal / 100000000).toFixed(4) : 0} BSV
                        </Typography>
                        <Typography component="h4" variant="subtitle2" style={{ marginTop: 5 }}>
                          ${item.dollarBal.toFixed(4)}
                        </Typography>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <UpdateWallet
                          userID={props.user ? props.user.uid : ""}
                          walletDetails={item}
                          walletIndex={index}
                          walletsList={walletsList}
                          setwalletsList={setwalletsList}
                          disabled={false}
                        />
                      </div>
                    </Paper>
                  );
                })}
              </div>
              <div style={{ margin: "auto", textAlign: "center" }}>
                <Button
                  variant="contained"
                  style={{ borderRadius: 50, backgroundColor: "white" }}
                  onClick={() => {
                    setwalletName("");
                    setwalletPassword("");
                    setdiologueState(true);
                  }}
                >
                  <AddRoundedIcon />
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <div style={{ marginTop: matchesMD ? 30 : 10 }}>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Paper className={classes.accountBox1} style={{ width: matchesMDUp ? "100%" : "48%" }}>
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        <Typography
                          style={{
                            color: theme.palette.textColors.para1,
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                          }}
                          variant="subtitle1"
                        >
                          <span> Total balance</span>
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
                      </div>
                      <IconButton className={classes.menuIcon}>
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                    <div style={{ marginTop: 0, marginBottom: 20, textAlign: "center" }}>
                      <Typography style={{ color: theme.palette.textColors.para1, fontWeight: 500 }} variant="h3">
                        $
                        {walletsList && walletsList[selectedWallet] && walletsList[selectedWallet].dollarBal
                          ? walletsList[selectedWallet].dollarBal.toFixed(4)
                          : 0}
                      </Typography>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <RequestBSV
                        disabled={walletsList.length <= 0 ? true : false}
                        walletObj={walletsList && walletsList[selectedWallet] ? walletsList[selectedWallet] : null}
                      />
                      <SendBSV
                        disabled={walletsList.length <= 0 ? true : false}
                        walletObj={walletsList && walletsList[selectedWallet] ? walletsList[selectedWallet] : null}
                        bsvRate={bsvRate}
                      />
                    </div>
                  </div>
                </Paper>
                <Paper className={classes.accountBox1} style={{ width: matchesMDUp ? "100%" : "48%", maxHeight: "100%" }}>
                  <TimeSeriesChart activities={filteredActivites} />
                </Paper>
              </div>
            </div>
            {/* //tokens view */}
            <div style={{ width: "100%" }}>
              <TokensView
                updateUserTokensData={props.updateUserTokensData}
                user={props.user}
                walletsList={walletsList}
                tokensData={props.tokensData}
                history={props.history}
                selectedWallet={selectedWallet}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <Activity activities={filteredActivites} bsvRate={bsvRate} selectedActivityState={selectedActivityState} />
            </div>
          </Grid>
        </Grid>
        {EditDialog}
      </div>
    </>
  );
}

const mapStateToProps = ({ auth: { user, walletsData, tokensData } }) => ({
  user,
  walletsData,
  tokensData,
});

export default connect(mapStateToProps, { updateUserWalletsData, updateUserTokensData })(Dashboard);
