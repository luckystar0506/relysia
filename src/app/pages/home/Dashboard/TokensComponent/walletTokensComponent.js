import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useInterval from "./useInterval";
import { toAbsoluteUrl } from "../../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import MintTokenDrawer from "./sendDrawer";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import ScrollMenu from "react-horizontal-scrolling-menu";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  walletEleCon: {
    borderRadius: 15,
    height: 160,
    width: 200,
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
    justifyContent: "space-between",
    padding: "15px 18px",

    margin: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 200,
    },
  },
  scrollCon: {
    position: "relative",
    right: "2.5%",
    width: "105%",
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "100%",
    },
  },
}));

function WalletTokens(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [tokensList, settokensList] = useState([]);
  const [displayTokens, setdisplayTokens] = useState(true);
  const refContainer = useRef(null);

  useEffect(() => {
    setdisplayTokens(false);

    refresh(true);
  }, [props.computer]);

  const refresh = async (intial = false) => {
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
    if (intial) {
      setdisplayTokens(true);
    }
  };

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

  const ArrowRight = (
    <div style={{ width: 50 }}>
      <IconButton aria-label="next">
        <ArrowForwardIosRoundedIcon />
      </IconButton>
    </div>
  );

  const ArrowLeft = (
    <div style={{ width: 50 }}>
      <IconButton aria-label="back">
        <ArrowBackIosRoundedIcon />
      </IconButton>
    </div>
  );

  const Menu = (list) =>
    list.map((tokens, index) => {
      return (
        <Paper
          className={classes.walletEleCon}
          style={{
            backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          key={tokens[0]._id}
          elevation={2}
        >
          <MintTokenDrawer verfied={props.verfiedTokens.includes(tokens[0]._id)} tokens={tokens} />
        </Paper>
      );
    });

  return (
    <div style={{ width: "100%" }}>
      {tokensList.length > 0 && displayTokens && (
        <div className={classes.scrollCon} style={{ maxWidth: window.innerWidth - 450, overflow: "hidden !important" }}>
          <ScrollMenu
            data={Menu(Object.values(groupByRoot(tokensList)))}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            alignCenter={false}
            hideSingleArrow={true}
            itemStyle={{ outline: "none" }}
            ref={refContainer}
          />
        </div>
      )}
      {/* {Object.values(groupByRoot(tokensList)).map((tokens, index) => {
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
      })} */}
      {tokensList.length === 0 && (
        <Typography style={{ marginLeft: 30 }} variant="caption" color="textSecondary">
          You didnt have any tokens in this wallet yet
        </Typography>
      )}
    </div>
  );
}

export default WalletTokens;
