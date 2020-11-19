import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { toAbsoluteUrl } from "../../../../_metronic";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useSnackbar } from "notistack";
import { IconButton } from "@material-ui/core";
import clsx from "clsx";
import { Route, Switch } from "react-router-dom";
import OverviewPage from "./overviewPage";
import HTMLPage from "./htmlPage";
import "./docs.css";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  rightBarHead: {
    fontSize: 17,
    marginBottom: 2,
    fontWeight: 400,
  },
  rightBarEle: {
    cursor: "pointer",
    padding: "3px 0px 3px 15px",
    fontSize: 14,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    paddingTop: 10,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  purecontent: {},
}));

const sideBarData = [
  {
    title: "Pay Button",
    list: [
      {
        title: "Pay Button Overview",
        route: "overview",
      },
      {
        title: "HTML",
        route: "html",
      },
      {
        title: "React",
        route: "react",
      },
    ],
  },
  {
    title: "API",
    list: [
      {
        title: "API Overview",
        route: "api",
      },
      {
        title: "Apps",
        route: "apps",
      },
    ],
  },
];

function Documentation(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const [rightDrawer, setrightDrawer] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setrightDrawer(false);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minWidth: 300,
        maxWidth: 1380,
        margin: "auto",
        marginTop: 10,
        paddingBottom: 50,
        overflow: "hidden",
      }}
    >
      <div className={classes.root}>
        <div
          className={clsx(matchesMD ? classes.purecontent : classes.content, {
            [classes.contentShift]: rightDrawer,
          })}
          style={{ padding: matchesMD ? 10 : 30, width: matchesMD ? "100%" : 50 }}
        >
          <IconButton
            style={{
              float: "right",
              position: "relative",
              bottom: 20,
              left: 20,
            }}
            onClick={() => setrightDrawer(!rightDrawer)}
          >
            {rightDrawer ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
          <div>
            <Switch>
              <Route path="/docs/HTML" component={HTMLPage} />
              <Route path="/docs/overview" component={OverviewPage} />
            </Switch>
          </div>
        </div>
        <Drawer
          className={classes.drawer}
          variant={matchesMD ? "temporary" : "persistent"}
          onClose={() => setrightDrawer(false)}
          open={rightDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <div style={{ margin: "30px 10px 10px 22px" }}>
            {sideBarData.map((item1, index1) => {
              return (
                <div style={{ marginBottom: 20 }} key={"listdiv" + index1}>
                  <Typography className={classes.rightBarHead} variant="subtitle1">
                    {item1.title}
                  </Typography>
                  {item1.list.map((item2, index2) => (
                    <Typography
                      onClick={() => {
                        props.history.push("/docs/" + item2.route);
                      }}
                      className={classes.rightBarEle}
                      key={item2.route}
                      variant="subtitle2"
                      color="textSecondary"
                      style={{ color: props.history.location.pathname.includes(item2.route) ? theme.palette.primary.main : "" }}
                    >
                      {item2.title}
                    </Typography>
                  ))}
                </div>
              );
            })}
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Documentation;
