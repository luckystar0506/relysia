import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import objectPath from "object-path";
import KTToggle from "../../_assets/js/toggle";
import { toAbsoluteUrl } from "../..";
import SwipeableMenuDrawer from "./customSideBar";

class HeaderMobile extends React.Component {
  toggleButtonRef = React.createRef();

  componentDidMount() {
    new KTToggle(this.toggleButtonRef.current, this.props.toggleOptions);
  }

  render() {
    const { htmlClassService } = this.props;
    const headerMobileCssClasses = htmlClassService.classes.header_mobile.join(" ");
    return (
      <div id="kt_header_mobile" className={`kt-header-mobile ${headerMobileCssClasses}`}>
        <div className="kt-header-mobile__logo">
          <Link to="/">
            <img alt="logo" src={toAbsoluteUrl("/media/logos/logo-sm.png")} style={{ height: "100%" }} />
          </Link>
        </div>
        <div className="kt-header-mobile__toolbar">
          <SwipeableMenuDrawer history={this.props.history} />

          <button ref={this.toggleButtonRef} className="kt-header-mobile__toolbar-topbar-toggler" id="kt_header_mobile_topbar_toggler">
            <i className="flaticon-more-1" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  asideDisplay: objectPath.get(store.builder.configs, "aside.self.display"),
  toggleOptions: {
    target: "body",
    targetState: "kt-header__topbar--mobile-on",
    togglerState: "kt-header-mobile__toolbar-topbar-toggler--active",
  },
  toggleOptions2: {
    target: "body",
    targetState: "kt_header_mobile_toggle",
    togglerState: "header-menu-wrapper",
  },
});

export default connect(mapStateToProps)(HeaderMobile);
