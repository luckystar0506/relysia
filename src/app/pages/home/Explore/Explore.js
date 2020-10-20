import React from "react";
import loadable from "@loadable/component";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import clsx from "clsx";
import { TitleComponent } from "../../../partials/content/helmetComponent";
import { connect } from "react-redux";
import { updateUserData } from "../../../store/ducks/auth.duck";

const LoginPopup = loadable(() => import("../../auth/LoginPopup.js"));

function Explore(props) {
  console.log("user", props.user);
  return (
    <div>
      <h1>explore page</h1>
    </div>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps, { updateUserData })(injectIntl(Explore));
