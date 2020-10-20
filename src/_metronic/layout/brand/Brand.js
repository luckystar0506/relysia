/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as builder from "../../ducks/builder";
import { toAbsoluteUrl } from "../../utils/utils";

class Brand extends React.Component {
  render() {
    const { brandClasses } = this.props;
    return (
      <div className={`kt-header__brand ${brandClasses} kt-grid__item`} id="kt_header_brand">
        <div className="kt-header__brand-logo">
          <Link to="/">
            <img
              className="kt-header__brand-logo-default"
              alt="logo"
              style={{ height: 40, width: 40, marginBottom: 10 }}
              src={toAbsoluteUrl("/media/logos/bird-xs.png")}
            />

            <img
              className="kt-header__brand-logo-sticky"
              alt="logo"
              style={{ height: 40, width: 40, marginBottom: 10 }}
              src={toAbsoluteUrl("/media/logos/bird-xs.png")}
            />
          </Link>
        </div>

        <div className="kt-header__brand-nav" style={{ marginLeft: 7 }}>
          <Link to="/">
            <span>
              {" "}
              <h1 style={{ color: "white", display: "inline", fontWeight: 500 }}>Wall</h1>
              <h1 style={{ color: "#FFA500", display: "inline", fontWeight: 300 }}>et</h1>{" "}
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    brandClasses: builder.selectors.getClasses(store, {
      path: "brand",
      toString: true,
    }),
  };
};

export default connect(mapStateToProps)(Brand);
