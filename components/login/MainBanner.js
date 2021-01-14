import React, { useState } from "react";
import * as Icon from "react-feather";
import Link from "next/link";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast, Slide } from "react-toastify";
import firebase from "../../config/fire-conf";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDataAction } from "../../store/actions/actiosMain";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";

var googleProvider = new firebase.auth.GoogleAuthProvider();
var githubProvider = new firebase.auth.GithubAuthProvider();

function MainBanner() {
  const [EmailField, setEmailField] = useState("");
  const [PasswordField, setPasswordField] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state) => state.userData);
  const router = useRouter();

  const onUserLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(EmailField, PasswordField)
      .then((res) => {
        if (res.user) {
          dispatch(updateUserDataAction(res.user));
        }
        setLoading(false);
        toast.success("User Lggged in Successfully", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 300);
      })
      .catch((error) => {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setLoading(false);
      });
  };

  const signInWithGithub = (e) => {
    e.preventDefault();

    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then(function(result) {
        if (result.user) {
          dispatch(updateUserDataAction(result.user));
        }
        toast.success("User Lggged in Successfully", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 300);
      })
      .catch(function(error) {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function(result) {
        if (result.user) {
          dispatch(updateUserDataAction(result.user));
        }
        toast.success("User Lggged in Successfully", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 300);
      })
      .catch(function(error) {
        var errorMessage = error.message;
        toast.error(errorMessage, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="main-banner" style={{ zIndex: 100 }}>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-lg-5">
                <div className="hero-content">
                  <h1>Sign In</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida.
                  </p>
                  <Link href="/auth/register">
                    <a className="btn btn-primary">Register With Email</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 offset-lg-1">
                <div className="banner-form ml-3">
                  <form onSubmit={onUserLogin}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        onChange={(e) => {
                          setEmailField(e.target.value);
                        }}
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        onChange={(e) => {
                          setPasswordField(e.target.value);
                        }}
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        minLength={6}
                        required
                      />
                    </div>
                    {!Loading ? (
                      <button type="submit" className="btn btn-primary">
                        Log In
                      </button>
                    ) : (
                      <div style={{ marginTop: 25, padding: 10 }}>
                        <CustomLoader />
                      </div>
                    )}
                  </form>
                  <div>
                    <p style={{ textAlign: "center", marginTop: 15, marginTop: 15 }}>or</p>
                    <div className="products-details" style={{ marginTop: 0 }}>
                      <div className="products-share-social" style={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
                        <ul>
                          <li style={{ marginRight: 12 }} data-toggle="tooltip" data-placement="bottom" title="SignIn With Google">
                            <a onClick={signInWithGoogle} href="#" className="google">
                              <FaGoogle />
                            </a>
                          </li>
                          <li data-toggle="tooltip" data-placement="bottom" title="SignIn With Github">
                            <a onClick={signInWithGithub} href="#" className="github">
                              <Icon.GitHub />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <div className="shape1">
        <img src={require("../../static/images/shape1.png")} alt="shape" />
      </div>
      <div className="shape2 rotateme">
        <img src={require("../../static/images/shape2.svg")} alt="shape" />
      </div>
      <div className="shape3">
        <img src={require("../../static/images/shape3.svg")} alt="shape" />
      </div>
      <div className="shape4">
        <img src={require("../../static/images/shape4.svg")} alt="shape" />
      </div>
      <div className="shape5">
        <img src={require("../../static/images/shape5.png")} alt="shape" />
      </div>
      <div className="shape6 rotateme">
        <img src={require("../../static/images/shape4.svg")} alt="shape" />
      </div>
      <div className="shape7">
        <img src={require("../../static/images/shape4.svg")} alt="shape" />
      </div>
      <div className="shape8 rotateme">
        <img src={require("../../static/images/shape2.svg")} alt="shape" />
      </div>
    </div>
  );
}

export default MainBanner;
