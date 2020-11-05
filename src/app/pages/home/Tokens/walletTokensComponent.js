import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useInterval from "./useInterval";
import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import MintTokenDrawer from "./sendDrawer";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";

const useStyles = makeStyles((theme) => ({
  walletEleCon: {
    borderRadius: 15,
    height: 210,
    width: 200,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "15px 18px",
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

  useEffect(() => {
    refresh();
  }, [props.computer]);

  const refresh = async () => {
    if (props.computer) {
      const revs = await props.computer.getRevs(props.computer.db.wallet.getPublicKey().toString());
      // console.log("revs", revs);
      settokensList(
        await Promise.all(
          revs.map(async (rev) => {
            return props.computer.sync(rev);
          })
        )
      );
    }
  };
  // console.log("tokensList", tokensList);
  useInterval(() => {
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
  return (
    <>
      {Object.values(groupByRoot(tokensList)).map((tokens, index) => {
        console.log("tokens", props.computer);
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
            <MintTokenDrawer verfied={props.verfiedTokens.includes(tokens[0]._id)} tokens={tokens} />
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
