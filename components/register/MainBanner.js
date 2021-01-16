import React, { useState } from "react";
import * as Icon from "react-feather";
import Link from "next/link";
import CustomLoader from "../Layouts/CustomLoader";
import { ToastContainer, toast, Slide } from "react-toastify";
import firebase from "../../config/fire-conf";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDataAction } from "../../store/actions/actiosMain";
import { useRouter } from "next/router";

function MainBanner() {
  const [EmailField, setEmailField] = useState("");
  const [PasswordField, setPasswordField] = useState("");
  const [UsernameField, setUsernameField] = useState("");

  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userDataRedux = useSelector((state) => state.userData);
  const router = useRouter();
  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(EmailField, PasswordField)
      .then((res) => {
        var user = firebase.auth().currentUser;

        let userLocal = { ...res.user, displayName: UsernameField };
        if (userLocal) {
          dispatch(updateUserDataAction(userLocal));
        }

        user.updateProfile({
          displayName: UsernameField,
        });
        setLoading(false);
        toast.success("User Registered Successfully", {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 200);
      })
      .catch((error) => {
        let errorMessage = error.message;
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

  return (
    <div className="main-banner" style={{ zIndex: 100 }}>
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-lg-5">
                <div className="hero-content">
                  <h1>Register Today!</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida.
                  </p>
                  <Link href="/auth/login">
                    <a className="btn btn-primary">Already have an Account</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 offset-lg-1">
                <div className="banner-form ml-3">
                  <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                      <label>Display Name</label>
                      <input
                        onChange={(e) => {
                          setUsernameField(e.target.value);
                        }}
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        onChange={(e) => {
                          setEmailField(e.target.value);
                        }}
                        required
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        onChange={(e) => {
                          setPasswordField(e.target.value);
                        }}
                        required
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                      />
                    </div>

                    {!Loading ? (
                      <button type="submit" className="btn btn-primary">
                        Register Now
                      </button>
                    ) : (
                      <CustomLoader />
                    )}
                  </form>
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
