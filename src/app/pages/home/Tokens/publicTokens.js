import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/database";
import { useSnackbar } from "notistack";
import { toAbsoluteUrl } from "../../../../_metronic";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InfoBtn from "./infoDialog";

const useStyles = makeStyles((theme) => ({
  menuIcon: { float: "right", position: "releative", left: 5, bottom: 5 },

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
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "50%",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

let backupData = [];

function PublicTokens(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [tokensList, settokensList] = useState([]);
  const [searchVal, setsearchVal] = useState("");
  const [infodialogState, setinfodialogState] = useState(false);

  useEffect(() => {
    getPublicTokens();
  }, []);

  const getPublicTokens = () => {
    firebase
      .database()
      .ref("tokens")
      .orderByChild("status")
      .equalTo("Open")
      .once("value", (snap) => {
        let tokensList = snap.val() ? Object.values(snap.val()).filter((x) => x.verfied) : [];
        settokensList(tokensList);
        backupData = tokensList;
      });
  };

  const searchFilter = () => {
    if (searchVal === "") {
      settokensList(backupData);
    } else {
      let filterArr = [];
      backupData.map((item, indx) => {
        let localsearchVal = searchVal.toLowerCase();
        if (
          (item.name && item.name.includes(localsearchVal)) ||
          (item.description && item.description.includes(localsearchVal)) ||
          (item.websiteUrl && item.websiteUrl.includes(localsearchVal)) ||
          (item.coins && item.coins.includes(localsearchVal))
        ) {
          filterArr.push(item);
        }
      });
      settokensList(filterArr);
    }
  };

  return (
    <>
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <Paper className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search Tokens"
            onChange={(e) => setsearchVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchFilter();
              }
            }}
          />
          <IconButton onClick={searchFilter} className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div style={{ marginTop: 12, marginBottom: 20, display: "flex", flexWrap: "wrap" }}>
        {tokensList.map((item, index1) => {
          return (
            <Paper
              className={classes.walletEleCon}
              style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              key={item._id + index1}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <Paper style={{ border: "0px solid red", borderRadius: "50%" }} elevation={2}>
                  <Avatar
                    src={
                      item.tokenImage
                        ? item.tokenImage
                        : "https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg"
                    }
                    alt="logo"
                    style={{ width: 50, height: 50 }}
                  />
                </Paper>
                <div style={{ marginLeft: "auto" }}>
                  <Typography variant="subtitle1" component="span" style={{ fontWeight: 500, color: theme.palette.textColors.textGreen }}>
                    {item.coins}
                  </Typography>
                </div>
              </div>
              <Typography
                component="h3"
                variant="subtitle1"
                style={{
                  fontWeight: 600,
                  display: "block",
                  color: theme.palette.textColors.head,
                  whiteSpace: "nowrap",
                  overflow: "hidden ",
                  width: "100%",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                style={{
                  color: theme.palette.textColors.subParagraph,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  marginTop: 10,
                  wordBreak: "break-word",
                  minHeight: 40,
                  fontWeight: 400,
                }}
              >
                {item.description ? item.description : "-"}
              </Typography>
              <div style={{ marginTop: 10 }}>
                <InfoBtn tokenDetails={item} />
              </div>
            </Paper>
          );
        })}
      </div>
    </>
  );
}

export default PublicTokens;
