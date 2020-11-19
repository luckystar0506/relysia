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
        marginTop: 20,
        padding: 10,
        paddingBottom: 50,
        overflow: "hidden",
      }}
    >
      <div className={classes.root}>
        <div
          className={clsx(matchesMD ? classes.purecontent : classes.content, {
            [classes.contentShift]: rightDrawer,
          })}
          style={{ padding: matchesMD ? 10 : 20 }}
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
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
              hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio
              morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus
              euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
              imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at
              consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
              tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
              Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
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
