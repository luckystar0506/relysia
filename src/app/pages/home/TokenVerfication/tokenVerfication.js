import React, { useState, useEffect } from "react";
import Computer from "bitcoin-computer";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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

const useStyles = makeStyles((theme) => ({
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

function TokensVerfication(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [isUserAdmin, setisUserAdmin] = useState(false);
  const [tokensObj, settokensObj] = useState({});

  useEffect(() => {
    if (props.user && props.user.uid) {
      firebase
        .database()
        .ref("admins/" + props.user.uid)
        .once("value")
        .then((snap) => {
          if (snap.val()) {
            setisUserAdmin(true);
            getTokens();
          } else {
            props.history.push("/dashboard");
          }
        });
    } else {
      props.history.push("/auth");
    }
  }, [props.user]);

  const getTokens = () => {
    firebase
      .database()
      .ref("tokens")
      .on("value", (snap) => {
        settokensObj(snap.val());
      });
  };

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
        <Grid item xs={12} md={12}>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1 }}>
                Verify User Tokens
              </Typography>
            </div>
            <div style={{ marginTop: 10 }}>
              {Object.keys(tokensObj).map((key, index1) => {
                return (
                  <div key={key} style={{ marginBottom: 20 }}>
                    <Typography variant="h6" component="h3" style={{ color: "#787d95c2", marginLeft: 10 }}>
                      uid: {key}
                      {Object.values(tokensObj[key]) && Object.values(tokensObj[key])[0] && Object.values(tokensObj[key])[0].userEmail
                        ? `, email: ${Object.values(tokensObj[key])[0].userEmail}`
                        : ""}
                    </Typography>
                    <div style={{ marginTop: 12, marginBottom: 20, display: "flex", flexWrap: "wrap" }}>
                      {Object.values(tokensObj[key]).map((item, index2) => {
                        return (
                          <Paper
                            className={classes.walletEleCon}
                            style={{
                              backgroundImage: `url(${toAbsoluteUrl("/media/bg/btcBg.png")})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                            key={item._id + index2}
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
                                <Typography
                                  variant="subtitle1"
                                  component="span"
                                  style={{ fontWeight: 500, color: theme.palette.textColors.textGreen }}
                                >
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
                              <Switch
                                checked={item.verfied ? item.verfied : false}
                                onChange={() => {
                                  if (props.user) {
                                    let updates = {};
                                    updates["tokens/" + key + "/" + item._id + "/verfied"] = item.verfied ? !item.verfied : true;
                                    firebase
                                      .database()
                                      .ref()
                                      .update(updates);
                                  }
                                }}
                                name="checkedA"
                                inputProps={{ "aria-label": "secondary checkbox" }}
                              />
                            </div>
                          </Paper>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps, {})(TokensVerfication);
