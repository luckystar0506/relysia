/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";
import Button from "@material-ui/core/Button";
import { updateProfilePicFunc } from "../../store/ducks/auth.duck";
import Badge from "@material-ui/core/Badge";
import { DB1 } from "../../../index";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { withStyles } from "@material-ui/core/styles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import clsx from "clsx";

const styles = (theme) => ({
  list: {
    width: 375,
    height: "100%",
    padding: "30px 0px 40px 0px",

    [theme.breakpoints.down("xs")]: {
      width: "70vw",
    },
  },
  sideBarPadding: {
    paddingLeft: "30px !important",
    paddingRight: "30px !important",
  },
  fullList: {
    width: "auto",
  },
  staticCon: {
    minHeight: 100,
    [theme.breakpoints.down("xs")]: {
      minHeight: 50,
    },
  },
});

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: null,
      userName: "",
      userBalance: 0,
      bsvPrice: 100,
      isUserAdmin: false,
      sidebar: false,
      userEmail: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateProfilePic !== this.props.updateProfilePic) {
      if (this.props.updateProfilePic === true) {
        this.getUserData(this.props.profilePicUrl);
        this.props.updateProfilePicFunc({ type: false, url: "" });
      }
    }
    if (prevProps.updateTutorStatus !== this.props.updateTutorStatus) {
      setTimeout(() => {
        this.checkUserStatus();
      }, 3000);
    }
  }

  checkUserStatus = async () => {
    let user = await firebase.auth().currentUser;
    if (user) {
      //is user admin
      let isUserAdminStatus = await firebase
        .database()
        .ref("/admins/" + user.uid)
        .once("value")
        .then((snapshot) => (snapshot.val() ? true : false));
      this.setState({ isUserAdmin: isUserAdminStatus });
    }
  };

  componentDidMount() {
    this.getUserData();
    this.checkUserStatus();

    //fetching price data
    DB1.ref("stats/market_price_usd")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          this.setState({
            bsvPrice: snapshot.val(),
          });
        }
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        DB1.ref("KeyStore/" + user.uid + "/balance").on("value", (snapshot) => {
          if (snapshot.val()) {
            this.setState({
              userBalance: snapshot.val(),
            });
          }
        });
      }
    });
  }

  getUserData = (url) => {
    if (url) {
      this.setState({
        userImage: url,
      });
    } else {
      let user = firebase.auth().currentUser;
      this.setState({
        userName: user.displayName,
        userEmail: user.email,
        userImage: user.photoURL ? user.photoURL : null,
      });
    }
  };

  toggleDrawer = (val) => () => {
    this.setState({
      sidebar: val,
    });
  };

  render() {
    const { classes } = this.props;

    let showBadge = false;
    let showAvatar = true;
    let showHi = true;
    if (this.state.userImage) {
      showBadge = false;
      showAvatar = true;
    } else {
      showBadge = true;
      showAvatar = false;
    }

    const sideList = (
      <div className={classes.list} style={{ height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", height: "5%" }} className={classes.sideBarPadding}>
          <Typography variant="h5" style={{ fontWeight: 500, color: "#3f4254" }}>
            User Profile
          </Typography>
          <div className="btn btn-success btn-sm btn-bold btn-font-md" style={{ fontSize: 10, padding: "2px 5px", marginLeft: 12 }}>
            $ {((this.state.userBalance * this.state.bsvPrice) / 100000000).toFixed(2)}
          </div>
          <IconButton
            aria-label="close"
            onClick={() => {
              this.toggleDrawer(false);
            }}
            size="small"
            style={{ backgroundColor: "#f3f6f9", marginLeft: "auto", borderRadius: 5, padding: 5 }}
          >
            <CloseIcon fontSize="small" style={{ color: "#b5b5c3" }} />
          </IconButton>
        </div>
        <PerfectScrollbar style={{ maxHeight: "94%", height: "auto", marginTop: 10, paddingBottom: 20 }}>
          <div className={classes.sideBarPadding} style={{ display: "flex", alignItems: "center", minHeight: 80, marginBottom: 25 }}>
            <div style={{ width: "35%", height: "100%", marginRight: 15 }}>
              {(() => {
                if (!this.state.userImage) {
                  return (
                    <div
                      style={{
                        height: "auto",
                        width: "100%",
                        backgroundColor: "#f3f6f9",
                        color: "#0abb87",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 20,
                        fontWeight: 600,
                        borderRadius: 10,
                      }}
                      className={classes.staticCon}
                    >
                      {this.state.userName && this.state.userName[0]}
                    </div>
                  );
                } else {
                  return <img style={{ height: "auto", width: "100%", borderRadius: 10 }} src={this.state.userImage} alt="pic" />;
                }
              })()}
            </div>
            <div style={{ width: "65%", height: "100%" }}>
              <Typography
                variant="h5"
                style={{ fontWeight: 500, color: "#3f4254", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {this.state.userName}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#92929e",
                }}
              >
                <EmailIcon
                  style={{
                    marginRight: 5,
                  }}
                />
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{this.state.userEmail}</span>
              </Typography>
              <Button
                className="btn btn-label-brand btn-sm btn-bold"
                style={{ width: 120, marginTop: 10 }}
                onClick={this.props.logOutTrigger}
              >
                <FormattedMessage id="TOPBAR.DROPDOWN.SIGNOUT" defaultMessage="Sign Out" />
              </Button>
            </div>
          </div>
          <div className={classes.sideBarPadding}>
            <Divider light />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 15, marginTop: 15 }}>
            <div className="kt-notification">
              <Link
                to="/profile"
                className={clsx("kt-notification__item", classes.sideBarPadding)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="kt-notification__item-icon"
                  style={{
                    backgroundColor: "#f3f6f9",
                    borderRadius: 5,
                    padding: "6px 8px",
                    marginRight: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="flaticon-avatar kt-font-success" />
                </div>
                <div className="kt-notification__item-details">
                  <div className="kt-notification__item-title kt-font-bold">
                    <FormattedMessage id="TOPBAR.DROPDOWN.LINK.PROFILE" defaultMessage="My Profile" />
                  </div>
                  <div className="kt-notification__item-time">
                    <FormattedMessage id="TOPBAR.DROPDOWN.LINK.PROFILETEXT" defaultMessage="Account settings and more" />
                  </div>
                </div>
              </Link>

              {/* {this.state.isUseTutor && (
                <Link
                  to="/my-students"
                  className={clsx("kt-notification__item", classes.sideBarPadding)}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="kt-notification__item-icon"
                    style={{
                      backgroundColor: "#f3f6f9",
                      borderRadius: 3,
                      padding: "10px 12px",
                      marginRight: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i className="flaticon2-group kt-font-success" />
                  </div>
                  <div className="kt-notification__item-details">
                    <div className="kt-notification__item-title kt-font-bold">
                      <FormattedMessage id="TOPBAR.DROPDOWN.LINK.STUDENT" defaultMessage="My Students" />
                    </div>
                    <div className="kt-notification__item-time">
                      <FormattedMessage id="TOPBAR.DROPDOWN.LINK.STUDENTTEXT" defaultMessage="Students and more" />
                    </div>
                  </div>
                </Link>
              )} */}

              <Link
                to="/terms"
                className={clsx("kt-notification__item", classes.sideBarPadding)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="kt-notification__item-icon"
                  style={{
                    backgroundColor: "#f3f6f9",
                    borderRadius: 5,
                    padding: "6px 8px",
                    marginRight: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="flaticon-interface-11 kt-font-success" />
                </div>
                <div className="kt-notification__item-details">
                  <div className="kt-notification__item-title kt-font-bold">
                    <FormattedMessage id="TOPBAR.DROPDOWN.LINK.TERMS" defaultMessage="Terms and Contitions" />
                  </div>
                  <div className="kt-notification__item-time">
                    <FormattedMessage id="TOPBAR.DROPDOWN.LINK.TERMSTEXT" defaultMessage="Our Policies" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className={classes.sideBarPadding}>
            <Divider className={classes.sideBarPadding} light />
          </div>
          <div style={{ marginBottom: 15, marginTop: 25 }} className={classes.sideBarPadding}>
            <Typography variant="h6" style={{ fontWeight: 500, color: "#3f4254" }}>
              Our Platforms
            </Typography>

            <div style={{ display: "flex", marginTop: 15 }}>
              <a href="https://block-codes.com/" target="_blank" className="platformIcon">
                <OverlayTrigger overlay={<Tooltip style={{ zIndex: 20000 }}>Block Codes</Tooltip>}>
                  <img
                    style={{ width: 30, height: "auto", marginRight: 22, marginLeft: 10 }}
                    src={toAbsoluteUrl("/media/platforms/blockcodes.png")}
                  />
                </OverlayTrigger>
              </a>
              <a href="https://apiandme.com/" target="_blank" className="platformIcon">
                <OverlayTrigger overlay={<Tooltip style={{ zIndex: 20000 }}>Api And Me</Tooltip>}>
                  <img style={{ width: 30, height: "auto", marginRight: 22 }} src={toAbsoluteUrl("/media/platforms/apiandme.png")} />
                </OverlayTrigger>
              </a>
              <a href="https://raspora.com/" target="_blank" className="platformIcon">
                <OverlayTrigger overlay={<Tooltip style={{ zIndex: 20000 }}>Raspora</Tooltip>}>
                  <img style={{ width: 40, height: "auto", marginRight: 22 }} src={toAbsoluteUrl("/media/platforms/raspora.png")} />
                </OverlayTrigger>
              </a>
              <a href="https://Wallet.com/" target="_blank" className="platformIcon">
                <OverlayTrigger overlay={<Tooltip style={{ zIndex: 20000 }}>Wallet</Tooltip>}>
                  <img style={{ width: 30, height: "auto" }} src={toAbsoluteUrl("/media/platforms/sato.png")} />
                </OverlayTrigger>
              </a>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );

    return (
      <div
        className="kt-header__topbar-item kt-header__topbar-item--user"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "0px 10px",
        }}
      >
        <div style={{ display: "flex", cursor: "pointer" }} onClick={this.toggleDrawer(true)}>
          <div style={{ display: "flex" }}>
            {showHi && (
              <span className="kt-header__topbar-welcome kt-hidden-mobile">
                <FormattedMessage id="TOPBAR.DROPDOWN1" defaultMessage="Hi," />
              </span>
            )}

            {showHi && (
              <span
                className="kt-header__topbar-username kt-hidden-mobile"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {this.state.userName && this.state.userName}
              </span>
            )}
          </div>

          <div style={{}}>
            {showAvatar && <img style={{ width: 45, borderRadius: 5 }} alt="Pic" src={this.state.userImage} />}

            {showBadge && (
              <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold kt-hidden-">
                {/* TODO: Should get from currentUser */}
                {this.state.userName && this.state.userName[0]}
              </span>
            )}
          </div>
        </div>
        <Drawer anchor="right" open={this.state.sidebar} onClose={this.toggleDrawer(false)}>
          <div
            style={{ height: "100%" }}
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user, updateProfilePic, profilePicUrl, updateTutorStatus } }) => ({
  user,
  updateProfilePic,
  profilePicUrl,
  updateTutorStatus,
});

export default withStyles(styles)(connect(mapStateToProps, { updateProfilePicFunc })(UserProfile));
