import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import { toAbsoluteUrl } from "../../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MoneyButton from "@moneybutton/react-money-button";

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
  activityBox2: {
    borderRadius: 15,
    width: "100%",
    padding: "5px 15px",
    marginBottom: 12,
  },
  reqBtns: {
    color: "#ffffff",
  },
  accountBox1Btn: {
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,
    marginRight: 20,
  },
  menuIcon: { float: "right", position: "releative", left: 5, bottom: 5 },
}));

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [walletsList, setwalletsList] = useState([
    {
      id: "wwww",
      btcBal: 3.87,
      dollarBal: 201.8,
      title: "Vianex Wallet",
    },
    {
      id: "wwww",
      btcBal: 3.87,
      dollarBal: 301.8,
      title: "jenne Wallet",
    },
  ]);
  const [selectedActivityState, setselectedActivityState] = useState(0);
  const matchesMD = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{ width: "100%", minWidth: 300, maxWidth: 1380, margin: "0px auto", marginTop: 20 }}>
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
                    key={item.id + index}
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
                        {item.btcBal} BTC
                      </Typography>
                      <Typography component="h4" variant="subtitle2">
                        ${item.dollarBal}
                      </Typography>
                    </div>

                    <div>
                      <Button className={classes.reqBtns} startIcon={<ArrowUpwardRoundedIcon />}>
                        Send BTC
                      </Button>
                      <Button className={classes.reqBtns} style={{ marginLeft: 10 }} startIcon={<ArrowDownwardRoundedIcon />}>
                        Request BTC
                      </Button>
                    </div>
                  </Paper>
                );
              })}
            </div>
            <Button
              startIcon={<AddRoundedIcon />}
              color="primary"
              variant="contained"
              style={{ marginLeft: 10, borderRadius: 50, paddingLeft: 25, paddingRight: 25 }}
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
                    <Typography style={{ color: theme.palette.textColors.para1, fontWeight: 500 }} variant="subtitle1">
                      Your ballance
                    </Typography>
                    <div style={{ marginTop: 15, marginBottom: 15, marginLeft: 5 }}>
                      <Typography style={{ color: theme.palette.textColors.para1, fontWeight: 600 }} variant="h5">
                        $2,876.2
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
            <Typography variant="h6" component="h2" style={{ color: theme.palette.textColors.head1 }}>
              Latest Activity
            </Typography>
            <div style={{ marginTop: 12, marginBottom: 20 }}>
              {" "}
              <Paper className={classes.activityBox2}>
                {[1, 2, 3].map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "15px 0px",
                        borderBottom: index === 2 ? "none" : "0.2px solid #eaeaea",
                      }}
                      key={"activity" + index}
                    >
                      <div style={{ width: "10%", marginRight: 10 }}>
                        <Avatar
                          style={{ width: "100%", height: "auto" }}
                          src="data:image/png;base64,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"
                        />
                      </div>
                      <div style={{ width: "60%" }}>
                        <Typography variant="body2" style={{ fontWeight: 500, color: theme.palette.textColors.para2 }}>
                          18/07/20 22:06:98
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            fontWeight: 500,
                            color: theme.palette.textColors.para2,

                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden ",
                            textOverflow: "ellipsis",
                          }}
                        >
                          dssgfhggjfdsfkjhwqwqwqwqwqwqwwwwwwwwwwqwqwqw
                        </Typography>
                      </div>
                      <div style={{ width: "25%", textAlign: "right" }}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            display: "block",
                            whiteSpace: "nowrap",
                            overflow: "hidden ",
                            textOverflow: "ellipsis",
                            fontWeight: 800,
                            color: theme.palette.textColors.para1,
                          }}
                        >
                          +0.5 BTC
                        </Typography>
                        <Typography variant="body2" style={{ fontWeight: 500, color: theme.palette.textColors.para2 }}>
                          $165.8
                        </Typography>
                      </div>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                  );
                })}
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
