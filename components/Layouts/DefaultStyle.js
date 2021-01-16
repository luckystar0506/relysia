import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Link from "../common/ActiveLink";
import * as Icon from "react-feather";
import firebase from "../../config/fire-conf";
import { updateUserDataAction } from "../../store/actions/actiosMain";
import { ToastContainer, toast } from "react-toastify";
import withWidth from "@material-ui/core/withWidth";

class DefaultStyle extends React.Component {
  state = {
    collapsed: true,
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
    window.scrollTo(0, 0);
  }

  signOut = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.updateUserDataActionFunc(null);
        toast.info("SignOut Successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (this.props.router.pathname.includes("/profile")) {
          this.props.router.push("/");
        }
      });
  };

  render() {
    const { collapsed } = this.state;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "navbar-toggler navbar-toggler-right collapsed"
      : "navbar-toggler navbar-toggler-right";

    let { pathname } = this.props.router;
    return (
      <header
        id="header"
        className={
          pathname.includes("/app/") &&
          (this.props.width !== "xs" || this.props.width !== "sm")
            ? "navbar-style-three"
            : ""
        }
      >
        <ToastContainer />

        <div id="navbar" className={`relysia-nav`}>
          <div
            className={
              pathname.includes("/app/") &&
              (this.props.width !== "xs" || this.props.width !== "sm")
                ? "container-fluid"
                : "container"
            }
          >
            <nav className="navbar navbar-expand-md navbar-light">
              <Link href="/">
                <a
                  className="navbar-brand nav-logo-con"
                  onClick={() => window.location.refresh()}
                >
                  <img
                    src={require("../../static/images/rLogo.png")}
                    alt="logo"
                    className="navbar-brand nav-logo-ele"
                  />
                </a>
              </Link>

              <button
                onClick={this.toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav nav ml-auto">
                  {!this.props.userData ? (
                    <>
                      <li className="nav-item mobile-nav-only">
                        <Link activeClassName="active" href="/auth/register">
                          <a className="nav-link">Register</a>
                        </Link>
                      </li>

                      <li className="nav-item mobile-nav-only">
                        <Link activeClassName="active" href="/auth/login">
                          <a className="nav-link">Login</a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item mobile-nav-only">
                      <Link activeClassName="active" href="#">
                        <a href="#" className="nav-link">
                          Hi, &nbsp;
                          {this.props.userData &&
                          this.props.userData.displayName
                            ? this.props.userData.displayName.length < 20
                              ? this.props.userData.displayName
                              : this.props.userData.displayName.slice(0, 19)
                            : this.props.userData.email.slice(0, 10)}
                          <Icon.ChevronDown />
                        </a>
                      </Link>
                      <ul className="dropdown_menu">
                        <li className="nav-item">
                          <Link activeClassName="active" href="/profile">
                            <a className="nav-link">Profile</a>
                          </Link>
                        </li>

                        <li className="nav-item">
                          <a
                            href="#"
                            onClick={this.signOut}
                            className="nav-link"
                          >
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link activeClassName="active" href="/">
                      <a className="nav-link">Home</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link activeClassName="active" href="/services">
                      <a className="nav-link">Services</a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link activeClassName="active" href="/contact">
                      <a className="nav-link">Contact</a>
                    </Link>
                  </li>
                  {this.props.userData && (
                    <li className="nav-item">
                      <Link activeClassName="active" href="/app/dashboard">
                        <a className="nav-link">Wallet</a>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {!this.props.userData ? (
                <div className="others-option">
                  <Link href="/auth/register">
                    <a className="btn btn-light nav-res-btn">Register</a>
                  </Link>
                  <Link href="/auth/login">
                    <a className="btn btn-primary nav-res-btn">Login</a>
                  </Link>
                </div>
              ) : (
                <div className="others-option">
                  <ul className="navbar-nav">
                    <li className="nav-item" style={{ padding: 0 }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="nav-link btn btn-primary nav-res-btn"
                        style={{
                          fontWeight: 600,
                          padding: "15px 40px",
                          color: "#ffffff",
                        }}
                      >
                        Hi, &nbsp;
                        {this.props.userData && this.props.userData.displayName
                          ? this.props.userData.displayName.length < 20
                            ? this.props.userData.displayName
                            : this.props.userData.displayName.slice(0, 19)
                          : this.props.userData.email.slice(0, 10)}
                        <Icon.ChevronDown />
                      </a>
                      <ul className="dropdown_menu" style={{ maxWidth: 160 }}>
                        <li className="nav-item">
                          <Link activeClassName="active" href="/profile">
                            <a className="nav-link">Profile</a>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a
                            href="#"
                            onClick={this.signOut}
                            className="nav-link"
                          >
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserDataActionFunc: (data) => {
      dispatch(updateUserDataAction(data));
    },
  };
};

export default withWidth()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultStyle))
);
