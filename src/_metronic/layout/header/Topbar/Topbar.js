/* eslint-disable no-unused-vars */
import React from "react";
import UserProfile from "../../../../app/partials/layout/UserProfile";
import { toAbsoluteUrl } from "../../../utils/utils";
import { connect } from "react-redux";
import * as builder from "../../../ducks/builder";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import HMenuItem from "./HMenuItem";
import LanguageSelectorDropdown from "../../../../app/partials/layout/LanguageSelector";
import QuickPanelToggler from "./quick-panel-toggler/QuickPanelToggle";
import VideocamIcon from "@material-ui/icons/Videocam";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { FormattedMessage, injectIntl } from "react-intl";
import firebase from "firebase/app";
import "firebase/auth";

var items = [];

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userID: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var userID = user.uid;
        this.setState({ loggedIn: true });
        this.updateTopHeader(user.uid);
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  updateTopHeader = (luserid) => {
    // items.push
  };

  get currentUrl() {
    return this.props.location.pathname.split(/[?#]/)[0];
  }

  logOut = (props) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ loggedIn: false });
        props.history.push("/");
      })
      .catch(function(error) {});
  };

  render() {
    let loggedInItems = (
      <div className="kt-header__topbar">
        <QuickPanelToggler />
        {/* //menu */}
        <UserProfile logOutTrigger={() => this.logOut()} showAvatar={false} showHi={true} showBadge={true} />
      </div> 
    );

    let loggedOutItems = (
      <div className="kt-header__topbar">
        <Link to="/auth/login">
          <Button color="primary" style={{ padding: 10, margin: 5 }}>
            <FormattedMessage id="TOPBAR.LOGIN" defaultMessage="Login" />
          </Button>
        </Link>
        <Link to="/auth/registration">
          <Button color="primary" style={{ padding: 10, margin: 5 }}>
            <FormattedMessage id="TOPBAR.REGISTER" defaultMessage="Register" />
          </Button>
        </Link>
      </div>
    );

    let display = this.state.loggedIn ? loggedInItems : loggedOutItems;

    const { ktMenuClasses, ulClasses, rootArrowEnabled } = this.props;
    items = this.props.menuConfig.header.items;
    let offCanvasCommonRef = React.createRef();
    let headerNav = (
      <div className="kt-header-menu-wrapper" id="kt_header_menu_wrapper" ref={this.offCanvasCommonRef}>
        <div id="kt_header_menu" className={`kt-header-menu kt-header-menu-mobile ${ktMenuClasses}`} ref={this.ktMenuCommonRef}>
          {this.props.isTutorConnectedToMeeting && (
            <Tooltip title="Back to meeting page" onClick={() => this.props.history.push("/meeting/" + this.props.meetingID)}>
              <IconButton aria-label="video" color="primary">
                <VideocamIcon style={{ color: "#ffffff" }} />{" "}
              </IconButton>
            </Tooltip>
          )}

          <ul className={`kt-menu__nav ${ulClasses}`}>
            {items.map((item, index) => {
              return (
                <React.Fragment key={`hmenuList${index}`}>
                  {item.title && (
                    <HMenuItem item={item} currentUrl={this.currentUrl} rootArrowEnabled={rootArrowEnabled} history={this.props.history} />
                  )}
                </React.Fragment>
              );
            })}
          </ul>
          <LanguageSelectorDropdown />
        </div>
      </div>
    );

    return (
      <>
        <div style={{ display: "flex" }}>
          {headerNav}
          {display}
        </div>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  config: store.builder.layoutConfig,
  menuConfig: store.builder.menuConfig,
  ktMenuClasses: builder.selectors.getClasses(store, {
    path: "header_menu",
    toString: true,
  }),
  rootArrowEnabled: builder.selectors.getConfig(store, "header.menu.self.root-arrow"),
  headerSelfSkin: builder.selectors.getConfig(store, "header.self.skin"),
  ulClasses: builder.selectors.getClasses(store, {
    path: "header_menu_nav",
    toString: true,
  }),
  isTutorConnectedToMeeting: store.auth.isTutorConnectedToMeeting,
  meetingID: store.auth.meetingID,
});

export default injectIntl(withRouter(connect(mapStateToProps)(Topbar)));
