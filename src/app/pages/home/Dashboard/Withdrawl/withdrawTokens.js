import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ClickNHold from "react-click-n-hold";

function WithdrawTokens(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [tokensList, settokensList] = useState([]);
  const [amountField, setamountField] = useState("");
  const [toField, settoField] = useState("");
  const [selectedToken, setselectedToken] = useState(0);

  useEffect(() => {
    refresh();
    setselectedToken(0);
  }, [props.computerObj]);

  const refresh = async () => {
    if (props.computerObj) {
      const revs = await props.computerObj.getRevs(props.computerObj.db.wallet.getPublicKey().toString());
      // console.log("revs", revs);
      settokensList(
        await Promise.all(
          revs.map(async (rev) => {
            return props.computerObj.sync(rev);
          })
        )
      );
    }
  };

  const sendTokens = (e, enough) => {
    if (enough) {
      props.setsendLoader(true);

      let pass = true;
      if (toField === "") { 
        pass = false;
        enqueueSnackbar("Please provide a public key!", { variant: "error" });
      }
      if (Number(amountField) <= 0) {
        pass = false;
        enqueueSnackbar("Please provide a valid token amount!", { variant: "error" });
      }
      if (pass) {
        //send tokens
        sendTokensTransc();
      } else {
        props.setsendLoader(false);
      }
    } else {
      enqueueSnackbar("Press and hold the Button for 2 seconds", { variant: "info" });
    }
  };

  const sendTokensTransc = async () => {
    let currentToken = Object.values(groupByRoot(tokensList))[selectedToken];
    const balance = currentToken.reduce((acc, token) => acc + parseInt(token.coins, 10), 0);
    if (amountField > balance) {
      enqueueSnackbar("You didnt have enough tokens!", { variant: "error" });
      props.setsendLoader(false);
      return null;
    }
    try {
      currentToken.sort((a, b) => a.coins - b.coins);
      const newTokens = [];
      let leftToSpend = amountField;
      for (const token of currentToken) {
        const tokenCoins = parseInt(token.coins, 10);
        if (0 < leftToSpend && 0 < tokenCoins) {
          newTokens.push(await token.send(Math.min(leftToSpend, tokenCoins), toField));
          leftToSpend -= tokenCoins;
        }
      }
      setTimeout(() => {
        enqueueSnackbar("Tokens sent successfully", { variant: "success" });
        props.setsendLoader(false);
        settoField("");
        setamountField("");
        props.setsendBsvDiologueState(false);
      }, 1500);
    } catch (err) {
      enqueueSnackbar(`error: ${err.message}`, { variant: "error" });
      console.log("err", err);
      props.setsendLoader(false);
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
    <>
      <div style={{ marginTop: 20, width: "80%" }}>
        <FormControl style={{ width: "100%", marginBottom: 10 }} disabled={tokensList.length === 0 ? true : false}>
          <InputLabel id="demo-simple-select-label">Select Token</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedToken}
            onChange={(e) => setselectedToken(e.target.value)}
            fullWidth
          >
            {Object.values(groupByRoot(tokensList)).map((tokens, index) => {
              console.log("tokens", tokens[0]);
              return (
                <MenuItem key={tokens[0]._id + "menuitem"} value={index}>
                  {`${tokens[0].name} (id: ${tokens[0]._id})`}
                </MenuItem>
              );
            })}
            {tokensList.length === 0 && <MenuItem value={0}>You didn't have any tokens</MenuItem>}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          onChange={(e) => {
            setamountField(e.target.value);
          }}
          value={amountField}
          label="Amount"
          variant="outlined"
          className={`custom-padding`}
          type="number"
          disabled={tokensList.length === 0 ? true : false}
        />
        <TextField
          fullWidth
          onChange={(e) => {
            settoField(e.target.value);
          }}
          value={toField}
          label="To"
          variant="outlined"
          className={`custom-padding`}
          style={{ marginTop: 10 }}
          placeholder="public key"
          disabled={tokensList.length === 0 ? true : false}
        />
      </div>

      <DialogActions style={{ position: "relative", left: 20, marginTop: 20 }}>
        <Button disabled={props.sendLoader} color="primary" onClick={() => props.setsendBsvDiologueState(false)}>
          Cancel
        </Button>

        {tokensList.length === 0 ? (
          <Button disabled color="primary" style={{ width: 100 }}>
            Send Tokens
          </Button>
        ) : (
          <ClickNHold time={1.5} onEnd={sendTokens}>
            <Button disabled={props.sendLoader ? true : false} color="primary" style={{ width: 100 }}>
              {props.sendLoader ? <CircularProgress size={20} /> : "Send Tokens"}
            </Button>
          </ClickNHold>
        )}
      </DialogActions>
    </>
  );
}

export default WithdrawTokens;

