import React, { useState, useRef, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import firebase from "../../config/fire-conf";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WithdrawDialog(props) {
  const classes = useStyles();

  const [loading, setloading] = useState(false);
  const [walletAomunt, setwalletAomunt] = useState("");
  const [walletAddress, setwalletAddress] = useState("");
  const [withdrawType, setwithdrawType] = useState("BSV");
  const [tokenAomunt, settokenAomunt] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [tokensList, settokensList] = useState([]);
  const [selectedToken, setselectedToken] = useState(0);

  useEffect(() => {
    getTokens();
  }, [props.walletComputerObj]);

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

  const withdrawTokens = async () => {
    setloading(true);

    try {
      let currentToken = Object.values(groupByRoot(tokensList))[selectedToken];

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

  const getTokens = async () => {
    if (props.walletComputerObj) {
      const revs = await props.walletComputerObj.getRevs(
        props.walletComputerObj.db.wallet.getPublicKey().toString()
      );
      settokensList(
        await Promise.all(
          revs.map(async (rev) => {
            return props.walletComputerObj.sync(rev);
          })
        )
      );
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

  return (
    <Dialog
      open={props.dialogState}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      style={{ zIndex: 100 }}
      maxWidth="sm"
    >
      <h5 style={{ padding: "18px 24px 5px 24px" }}>Transfer BSVs or Tokens</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (withdrawType == "BSV") {
            withdrawBSVs();
          } else {
            withdrawTokens();
          }
        }}
      >
        <DialogContent>
          <div className="form-group">
            <label>Transaction Type</label>
            <div style={{ maxWidth: 200, marginTop: -5, marginLeft: 5 }}>
              <Select
                labelId="withdrawType-select-label"
                id="withdrawType-select"
                value={withdrawType}
                onChange={(e) => setwithdrawType(e.target.value)}
                fullWidth
                className={classes.select}
                inputProps={{
                  classes: {
                    icon: classes.icon,
                  },
                }}
              >
                <MenuItem value={"BSV"}>BSV</MenuItem>
                <MenuItem value={"Token"}>Token</MenuItem>
              </Select>
            </div>
          </div>

          {withdrawType === "BSV" ? (
            <>
              <div className="form-group">
                <label>Aomunt</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      $
                    </span>
                  </div>
                  <input
                    onChange={(e) => {
                      setwalletAomunt(e.target.value);
                    }}
                    value={walletAomunt}
                    type="number"
                    className="form-control"
                    placeholder="USD"
                    required
                  />
                </div>
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
          ) : (
            <>
              <div className="form-group">
                <label>Select Token</label>
                <div style={{ maxWidth: 500, marginTop: -5, marginLeft: 5 }}>
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
                    {Object.values(groupByRoot(tokensList)).map(
                      (tokens, index) => {
                        return (
                          <MenuItem
                            key={tokens[0]._rootId + "menuitem"}
                            value={index}
                          >
                            {`${tokens[0].name} (_rootId: ${tokens[0]._rootId})`}
                          </MenuItem>
                        );
                      }
                    )}
                    {tokensList.length === 0 && (
                      <MenuItem value={0}>You didn't have any tokens</MenuItem>
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
                <label>Recipient Wallet PublicKey</label>
                <input
                  onChange={(e) => {
                    settokenAddress(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Public Key"
                  value={tokenAddress}
                  required
                />
              </div>
            </>
          )}
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
