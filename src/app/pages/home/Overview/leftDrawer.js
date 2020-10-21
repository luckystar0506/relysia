import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SettingsIcon from "@material-ui/icons/Settings";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    zIndex: -10,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function LeftDrawer(props) {
  const classes = useStyles();
  const [sideBarTabs, setsideBarTabs] = useState([
    { route: "dashboard", title: "Dashboard" },
    { route: "wallet", title: "Wallet" },
    { route: "transactions", title: "Transactions" },
    { route: "profile", title: "Profile" },
    { route: "settings", title: "Settings" },
    { route: "logout", title: "Logout" },
  ]);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
      style={{ zIndex: 1 }}
    >
      <Toolbar />

      <List style={{ paddingTop: 0, overflow: "hidden",  }}>
        {sideBarTabs.slice(0, 4).map((item, index) => (
          <ListItem
            button
            key={item.title + index}
            onClick={() => {
              if (item.title === "Profile") {
                props.history.push("/profile");
              } else {
                props.history.push("/overview/" + item.route);
              }
            }}
            style={{
              color: props.location.pathname && props.location.pathname.includes(item.route) ? "#3f50b5" : "",
              backgroundColor: props.location.pathname && props.location.pathname.includes(item.route) ? "rgba(0,0,0,0.1)" : "",
            }}
          >
            <ListItemIcon
              style={{
                color: props.location.pathname && props.location.pathname.includes(item.route) ? "#3f50b5" : "",
              }}
            >
              {(() => {
                if (index === 0) {
                  return <DashboardIcon />;
                } else if (index === 1) {
                  return <AccountBalanceWalletIcon />;
                } else if (index === 2) {
                  return <AccountBalanceIcon />;
                } else if (index === 3) {
                  return <PersonIcon />;
                }
              })()}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List style={{ overflow: "hidden" }}>
        {sideBarTabs.slice(4, 6).map((item, index) => (
          <ListItem
            button
            key={item.title + index}
            onClick={() => {
              props.history.push("/overview/" + item.route);
            }}
            style={{
              color: props.location.pathname && props.location.pathname.includes(item.route) ? "#3f50b5" : "",
              backgroundColor: props.location.pathname && props.location.pathname.includes(item.route) ? "rgba(0,0,0,0.1)" : "",
            }}
          >
            <ListItemIcon
              style={{
                color: props.location.pathname && props.location.pathname.includes(item.route) ? "#3f50b5" : "",
              }}
            >
              {(() => {
                if (index === 0) {
                  return <SettingsIcon />;
                } else if (index === 1) {
                  return <ExitToAppIcon />;
                }
              })()}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <div style={{ marginTop: "auto" }}>
        <Divider />

        <div className={classes.toolbar} style={{ minHeight: "auto" }}>
          <IconButton
            onClick={() => {
              localStorage.setItem("drawer-state", !props.open);
              props.setOpen(!props.open);
            }}
            color="secondary"
          >
            {props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      </div>
    </Drawer>
  );
}
