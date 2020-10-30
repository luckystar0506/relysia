import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import useInterval from "./useInterval";
import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import SendToken from "./sendToken";

const useStyles = makeStyles((theme) => ({
  walletEleCon: {
    borderRadius: 15,
    maxHeight: 210,
    width: 300,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "12px 18px",
    marginBottom: 12,
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 200,
    },
  },
}));

function WalletTokens(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [tokensList, settokensList] = useState([]);

  useInterval(() => {
    const refresh = async () => {
      if (props.computer) {
        const revs = await props.computer.getRevs(props.computer.db.wallet.getPublicKey().toString());

        settokensList(
          await Promise.all(
            revs.map(async (rev) => {
              return props.computer.sync(rev);
            })
          )
        );
      }
    };
    refresh();
  }, 3000);

  const groupByRoot = (list) =>
    list.reduce(
      (acc, obj) => ({
        ...acc,
        [obj["_rootId"]]: (acc[obj["_rootId"]] || []).concat(obj),
      }),
      {}
    );
  console.log("Object.values(groupByRoot(tokensList))", Object.values(groupByRoot(tokensList)));
  return (
    <> 
      {Object.values(groupByRoot(tokensList)).map((tokens, index) => {
        return (
          <Paper
            className={classes.walletEleCon}
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            key={tokens[0]._id}
          >
            <SendToken tokens={tokens} />
          </Paper>
        );
      })}
      {tokensList.length === 0 && (
        <Typography style={{ marginLeft: 30 }} variant="caption" color="textSecondary">
          You didnt have any tokens in this wallet yet
        </Typography>
      )}
    </>
  );
}

export default WalletTokens;
