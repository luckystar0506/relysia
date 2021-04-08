import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase, { DB1 } from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: "#f48665",
    },
    "&:after": {
      borderColor: "#f48665",
    },
  },
  icon: {
    fill: "#f48665",
  },
  root: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WithdrawDialog(props) {
  const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [walletAomunt, setwalletAomunt] = useState("");
  const [walletAomuntBsv, setwalletAomuntBsv] = useState("");
  const [bsvRate, setbsvRate] = useState(100);

  const [walletAddress, setwalletAddress] = useState("");
  const [withdrawType, setwithdrawType] = useState("BSV");
  const [tokenAomunt, settokenAomunt] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [selectedToken, setselectedToken] = useState(0);
  const [value, setValue] = useState(0);
  const [textFieldLabel1, settextFieldLabel1] = useState(
    "Recipient Wallet PublicKey/Address"
  );
  const [textFieldLabel2, settextFieldLabel2] = useState("Public Key");
  useEffect(() => {
    DB1.ref("stats/market_price_usd")
      .once("value")
      .then((snap) => {
        if (snap.val()) {
          setbsvRate(snap.val());
        }
      });
  }, []);

  useEffect(() => {
    if (props.walletStasTokens && props.walletStasTokens.length > 0) {
      setselectedToken("stasToken" + 0);
    } else {
      setselectedToken("bitcoinComputer" + 0);
    }
  }, [props.walletStasTokens]);

  useEffect(() => {
    if (selectedToken && selectedToken.includes("stasToken")) {
      settextFieldLabel1("Recipient Wallet Address");
      settextFieldLabel2("Address");
    } else if (selectedToken && selectedToken.includes("bitcoinComputer")) {
      settextFieldLabel1("Recipient Wallet PublicKey");
      settextFieldLabel2("Public Key");
    }
  }, [selectedToken]);

  const handleClose = () => {
    props.setdialogState(false);
  };

  const withdrawBSVs = async () => {
    setloading(true);

    try {
      let sendBsvAPI = firebase.functions().httpsCallable("walletSendBsv");
      let sendBsvRes = await sendBsvAPI({
        opData: ["relysia", "withdrawl"],
        withdrawlValues: {
          amount: walletAomunt,
          address: walletAddress,
        },
        id: props.walletData ? props.walletData.id : "",
      });

      if (sendBsvRes && sendBsvRes.data) {
        if (sendBsvRes.data.status && sendBsvRes.data.status === "error") {
          toast.error(sendBsvRes.data.msg, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setloading(false);
        } else if (
          sendBsvRes.data.status &&
          sendBsvRes.data.status === "success"
        ) {
          toast.success(sendBsvRes.data.msg, {
            position: "bottom-left",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setloading(false);
          handleClose();
          setwalletAddress("");
          setwalletAomunt("");
        }
      }
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

      setloading(false);
    }
  };

  const withdrawBitcoinComputerTokens = async () => {
    setloading(true);

    try {
      let selectedTokenIndex = Number(
        selectedToken.slice(selectedToken.length - 1, selectedToken.length)
      );

      let currentToken = Object.values(groupByRoot(props.tokensList))[
        selectedTokenIndex
      ];

      const balance = currentToken.reduce(
        (acc, token) => acc + parseInt(token.coins, 10),
        0
      );

      if (Number(tokenAomunt) > balance) {
        toast.error("You didnt have enough tokens!", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setloading(false);
        return null;
      }

      currentToken.sort((a, b) => a.coins - b.coins);
      const newTokens = [];
      let leftToSpend = Number(tokenAomunt);

      for (const token of currentToken) {
        const tokenCoins = parseInt(token.coins, 10);

        if (0 < leftToSpend && 0 < tokenCoins) {
          newTokens.push(
            await token.send(Math.min(leftToSpend, tokenCoins), tokenAddress)
          );
          leftToSpend -= tokenCoins;
        }
      }

      setTimeout(() => {
        toast.success("Tokens sent successfully", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setloading(false);
        handleClose();
        settokenAomunt("");
        settokenAddress("");
        props.getTokens();
      }, 1500);
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

      setloading(false);
    }
  };

  const withdrawStasTokens = async () => {
    setloading(true);

    try {
      let selectedTokenIndex = Number(
        selectedToken.slice(selectedToken.length - 1, selectedToken.length)
      );

      let currentToken = props.walletStasTokens[selectedTokenIndex];
      if (currentToken.balance < Number(tokenAomunt)) {
        toast.error("Insufficient tokens", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setloading(false);
        return null;
      }
      let stasTokenTransferAPI = firebase
        .functions()
        .httpsCallable("stasTokenTransferAndSplit");
      let res = await stasTokenTransferAPI({
        transferAmount: Number(tokenAomunt),
        walletId: props.walletId,
        recipientAddress: tokenAddress,
        currentTokenId: currentToken.tokenId,
      });
      console.log("res", res);

      if (res && res.data && res.data.status === "success") {
        toast.success(res.data.msg, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setloading(false);
        handleClose();
        settokenAomunt("");
        settokenAddress("");
        props.getWalletStasTokens();
      } else if (res && res.data && res.data.status === "errpr") {
        toast.error(res.data.msg, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setloading(false);
      } else {
        toast.error("An error occured", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setloading(false);
      }
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

      setloading(false);
    }
  };

  const groupByRoot = (list) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        [obj["_rootId"]]: (acc[obj["_rootId"]] || []).concat(obj),
      }),
      {}
    );

  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setwithdrawType("TOKEN");
    } else {
      setwithdrawType("BSV");
    }
    setValue(newValue);
  };

  return (
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      style={{ zIndex: 1000 }}
      maxWidth="sm"
    >
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Transfer BSVs or Tokens</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (withdrawType === "BSV") {
            withdrawBSVs();
          } else {
            if (selectedToken.includes("stasToken")) {
              withdrawStasTokens();
            } else {
              withdrawBitcoinComputerTokens();
            }
          }
        }}
      >
        <DialogContent>
          <div className="form-group">
            <label>Transaction Type</label>
            <div className="withdrawl-tab-con">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                style={{ position: "relative", top: -10, marginBottom: 10 }}
              >
                <Tab label="BSV" />
                <Tab label="Token" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <>
                  <div className="form-group">
                    <label>Aomunt</label>
                    <div className="withdraw-amount-con">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            $
                          </span>
                        </div>
                        <input
                          onChange={(e) => {
                            setwalletAomunt(e.target.value);
                            //converting amount to bsv
                            setwalletAomuntBsv(
                              Number(e.target.value) * (1 / bsvRate)
                            );
                          }}
                          value={walletAomunt}
                          type="number"
                          className="form-control"
                          placeholder="USD"
                          required
                        />
                      </div>
                      <SwapHorizIcon className="with-hori-icon" />
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            ฿
                          </span>
                        </div>
                        <input
                          onChange={(e) => {
                            setwalletAomuntBsv(e.target.value);
                            //converting bsv to  amount
                            setwalletAomunt(Number(e.target.value) * bsvRate);
                          }}
                          value={walletAomuntBsv}
                          type="number"
                          className="form-control"
                          placeholder="BSV"
                          required
                        />
                      </div>
                    </div>{" "}
                  </div>

                  <div className="form-group">
                    <label>Recipient Wallet Address</label>
                    <input
                      onChange={(e) => {
                        setwalletAddress(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Wallet Address"
                      value={walletAddress}
                      required
                      maxLength={200}
                    />
                  </div>
                </>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <>
                  <div className="form-group">
                    <label>Select Token</label>
                    <div
                      style={{ maxWidth: 500, marginTop: -5, marginLeft: 5 }}
                    >
                      <Select
                        labelId="withdrawToken-select-label"
                        id="withdrawToken-select"
                        value={selectedToken}
                        onChange={(e) => setselectedToken(e.target.value)}
                        fullWidth
                        className={classes.select}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                      >
                        {props.walletStasTokens.map((token, index) => {
                          return (
                            <MenuItem
                              key={token.tokenId + "stas"}
                              value={"stasToken" + index}
                            >
                              {`${token.ticker} (id: ${token.tokenId})`}
                            </MenuItem>
                          );
                        })}
                        {Object.values(groupByRoot(props.tokensList)).map(
                          (tokens, index) => {
                            return (
                              <MenuItem
                                key={tokens[0]._rootId + "menuitem"}
                                value={"bitcoinComputer" + index}
                              >
                                {`${tokens[0].name} (_rootId: ${tokens[0]._rootId})`}
                              </MenuItem>
                            );
                          }
                        )}

                        {props.tokensList.length === 0 &&
                          props.walletStasTokens.length === 0 && (
                            <MenuItem value={0}>
                              You didn't have any tokens
                            </MenuItem>
                          )}
                      </Select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      onChange={(e) => {
                        settokenAomunt(e.target.value);
                      }}
                      value={tokenAomunt}
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{textFieldLabel1}</label>
                    <input
                      onChange={(e) => {
                        settokenAddress(e.target.value);
                      }}
                      type="text"
                      className="form-control"
                      placeholder={textFieldLabel2}
                      value={tokenAddress}
                      required
                    />
                  </div>
                </>
              </TabPanel>
            </div>
          </div>
        </DialogContent>

        <DialogActions style={{ marginTop: 10, height: 50 }}>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-primary btn-small"
            style={{ marginRight: 5 }}
          >
            Cancel
          </button>
          {(() => {
            if (loading) {
              return (
                <div style={{ width: 80 }}>
                  <CustomLoader width={25} height={25} />
                </div>
              );
            } else {
              return (
                <button type="submit" className="btn btn-primary btn-small">
                  Send
                </button>
              );
            }
          })()}
        </DialogActions>
      </form>
      <ToastContainer />
    </Dialog>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
