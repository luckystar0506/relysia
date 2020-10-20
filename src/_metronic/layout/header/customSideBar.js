import React from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import MenuItemsList from "../MenuConfig";
import { toAbsoluteUrl } from "../..";
import DashboardIcon from "@material-ui/icons/Dashboard";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableMenuDrawer(props) {
  const classes = useStyles();
  const [drawerState, setdrawerState] = React.useState(false);

  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
      <div className="kt-header__brand-logo" style={{ display: "flex", alignItems: "center", padding: "15px 10px 10px 15px" }}>
        <img
          className="kt-header__brand-logo-default"
          alt="logo"
          style={{ height: 40, width: 40, marginBottom: 10 }}
          src={toAbsoluteUrl("/media/logos/bird-xs.png")}
        />

        <span>
          {" "}
          <h1 style={{ fontSize: 20, color: "#2c2d3a", display: "inline", fontWeight: 500 }}>Sato</h1>
          <h1 style={{ fontSize: 20, color: "#FFA500", display: "inline", fontWeight: 300 }}>learn</h1>{" "}
        </span>
      </div>
      <Divider />
      <List>
        {MenuItemsList.header.items.map((text, index) => (
          <ListItem button key={text.title} onClick={() => props.history.push("/" + text.page)}>
            <ListItemIcon>
              {(() => {
                if (index === 1) {
                  return <DashboardIcon />;
                } else if (index === 0) {
                  return <HomeIcon />;
                }
              })()}
            </ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <button onClick={() => setdrawerState(true)} className="kt-header-mobile__toolbar-toggler">
        <span className={drawerState ? "pppeo" : ""} />
      </button>
      <SwipeableDrawer anchor={"left"} open={drawerState} onClose={() => setdrawerState(false)} onOpen={() => setdrawerState(true)}>
        {list()}
      </SwipeableDrawer>
    </>
  );
}
