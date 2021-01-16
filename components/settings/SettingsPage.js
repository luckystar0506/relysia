import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {
  makeStyles,
  createMuiTheme,
  withStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GeneralSettings from "./General";

const useStyles = makeStyles((theme) => ({
  roottab: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  antCustomStyle: {
    backgroundColor: theme.palette.background.paper,
  },
 
}));

function SettingsPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const userDataRedux = useSelector((state) => state.userData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="page-head1 icon-btn-no-outline"
      style={{ margin: 0, marginTop: 20, textAlign: "left" }}
    >
      <div className="settings-con1 icon-btn-no-outline">
        <h2>Settings</h2>
        <div className={classes.roottab}>
          <div className={classes.antCustomStyle}>
            <AntTabs
              value={value}
              onChange={handleChange}
              aria-label="ant example"
            >
              <AntTab label="General" />
              <AntTab label="Wallet Secrets" />
            </AntTabs>
          </div>
        </div>
      </div>
      <section className="domain-search-area ">
        <div className="container" style={{ marginTop: 30, marginBottom: 50 }}>
          <TabPanel value={value} index={0}>
            <GeneralSettings
              walletsData={props.walletsData}
              setwalletsData={props.setwalletsData}
              userDataRedux={userDataRedux}
              walletListArray={Object.values(props.walletsData)}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <DbSecrets
              dbList={props.dbList}
              setdbList={props.setdbList}
              userDataRedux={userDataRedux}
            /> */}
          </TabPanel>
        </div>
      </section>
    </div>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
    width: "100%",
  },
  indicator: {
    backgroundColor: "#f48665",
  },
})((props) => <Tabs {...props} variant="scrollable" scrollButtons="auto" />);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: 600,
    marginRight: theme.spacing(4),
    color: "#6084a4",

    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#f48665",
      opacity: 1,
    },
    "&$selected": {
      color: "#f48665",
      fontWeight: 600,
    },
    "&:focus": {
      color: "#f48665",
    },
  },
  selected: {},
}))((props) => <Tab {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default SettingsPage;
