import React from "react";
import loadable from "@loadable/component";
import { connect } from "react-redux";
import objectPath from "object-path";
import { withRouter } from "react-router-dom";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import "./assets/Base.scss";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import LeftDrawer from "./leftDrawer";

const Header = loadable(() => import("./header/Header"));
const HeaderMobile = loadable(() => import("./header/HeaderMobile"));
const ScrollTop = loadable(() => import("../../app/partials/layout/ScrollTop"));
const QuickPanel = loadable(() => import("../../app/partials/layout/QuickPanel"));
const KtContent = loadable(() => import("./KtContent"));

const styles1 = [];
const htmlClassService = new HTMLClassService();
const useStyles = makeStyles((theme) => ({}));
let drawerStateLocalStorage = localStorage.getItem("drawer-state") === "false" ? false : true;

function Layout({
  children,
  subheaderDisplay,
  selfLayout,
  contentExtended,
  layoutConfig,
  contentContainerClasses,
  contentClasses,
  history,
  location,
}) {
  htmlClassService.setConfig(layoutConfig);
  contentClasses = htmlClassService.classes.content.join(" ");
  contentContainerClasses = htmlClassService.classes.content_container.join(" ");

  // scroll to top after location changes
  window.scrollTo(0, 0);
  const classes = useStyles();
  const routeLocation = useLocation();
  const [drawerState, setdrawerState] = React.useState(drawerStateLocalStorage);

  return selfLayout !== "blank" ? (
    <LayoutInitializer styles={styles1} menuConfig={MenuConfig} layoutConfig={LayoutConfig} htmlClassService={htmlClassService}>
      {/* <!-- begin:: Header Mobile --> */}
      {/* <HeaderMobile htmlClassService={htmlClassService} history={history} /> */}
      {/* <!-- end:: Header Mobile --> */}

      <div className="kt-grid kt-grid--hor kt-grid--root">
        <div
        // className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page"
        >
          <div
          // className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper"
          >
            {/* <!-- begin:: Header READY --> */}

            {/* <Header history={history} /> */}
            {/* <!-- end:: Header --> */}

            {/* <!-- begin:: Content --> */}
            <div
              // className="kt-body kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch"
              // id="kt_body"
              style={
                location.pathname.includes("auth")
                  ? {}
                  : {
                      flexGrow: 1,
                      height: "100%",
                      width: "100%",
                      margin: "auto",
                      display: "flex",
                    }
              }
            >
              {/* //left drawer */}
              {!location.pathname.includes("auth") && (
                <LeftDrawer open={drawerState} setOpen={setdrawerState} history={history} location={location} />
              )}
              <div
                className={`kt-content ${contentClasses} kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor`}
                id="kt_content"
                style={{ padding: 0, width: "100%", height: "100%" }}
              >
                {children}
              </div>
            </div>
            {/* <!-- end:: Content --> */}
          </div>
        </div>
        {/* <!-- end:: Body --> */}
      </div>
      <ScrollTop />
      {/* <QuickPanel /> */}
    </LayoutInitializer>
  ) : (
    <div className="kt-grid kt-grid--ver kt-grid--root kt-page">
      <KtContent>{children}</KtContent>
    </div>
  );
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display"),
  fluid: objectPath.get(layoutConfig, "content.width") === "fluid",
  contentExtended: objectPath.get(layoutConfig, "content.extended"),
});

export default withRouter(connect(mapStateToProps)(Layout));
