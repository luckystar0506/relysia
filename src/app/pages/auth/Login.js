import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import { updateUserData } from "../../store/ducks/auth.duck";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import "bootstrap-social/bootstrap-social.css";
import makeStyles from "@material-ui/core/styles/makeStyles";
import firebase from "firebase/app";
import "firebase/auth";

var googleProvider = new firebase.auth.GoogleAuthProvider();
var githubProvider = new firebase.auth.GithubAuthProvider();

const useStyles = makeStyles((theme) => ({
  gitBtn: {
    backgroundColor: "#444",
  },
}));

function Login(props) {
  const classes = useStyles();

  const { intl, goTo } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });

  const updateUserInRedux = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        updateUserData(user);
      }
    });
  };

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  const { enqueueSnackbar } = useSnackbar();

  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        if (props.isPopup) {
          props.setLoginPopup(false);
          if (goTo) {
            props.history.push(goTo);
            // props.history.push("/overview");
          }
        } else {
          props.history.push("/overview");
        }
        updateUserInRedux();

        // ...
      })
      .catch(function(error) {
        // Handle Errors here.

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        // ...
      });
  };

  const signInWithGithub = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        if (props.isPopup) {
          props.setLoginPopup(false);
          if (goTo) {
            props.history.push(goTo);
            // props.history.push("/overview");
          }
        } else {
          props.history.push("/overview");
        }
        updateUserInRedux();
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        enqueueSnackbar(error.message, {
          variant: "error",
        });
        // ...
      });
  };

  return (
    <div>
      <div className="kt-login__body" style={{ height: "calc(100vh - 188px)" }}>
        <div className="kt-login__form">
          <div className="kt-login__title">
            <h3>
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
          </div>
          <div style={{ marginBottom: 10 }}>
            <a onClick={signInWithGoogle} className="btn btn-block btn-social btn-google text-white" style={{ textAlign: "center" }}>
              <span className="fa fa-google text-white"></span>
              <span style={{ paddingRight: 20 }}>Sign in with Google</span>
            </a>
          </div>
          <div>
            <a
              className={clsx(classes.gitBtn, "btn btn-block btn-social btn-github text-white")}
              style={{ textAlign: "center" }}
              onClick={signInWithGithub}
            >
              <span className="fa fa-github text-white"></span>
              <span style={{ paddingRight: 20 }}> Sign in with Github</span>
            </a>
          </div>
          <p style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}>OR</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD",
                });
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD",
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD",
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {
              enableLoading();
              setTimeout(() => {
                firebase
                  .auth()
                  .signInWithEmailAndPassword(values.email, values.password)
                  .then(() => {
                    disableLoading();
                    if (props.isPopup) {
                      props.setLoginPopup(false);
                      if (goTo) {
                        props.history.push(goTo);
                        // props.history.push("/overview");
                      }
                    } else {
                      props.history.push("/overview");
                    }
                    updateUserInRedux();
                  })
                  .catch((error) => {
                    disableLoading();
                    setSubmitting(false);
                    enqueueSnackbar(error.message, {
                      variant: "error",
                    });
                    setStatus(
                      intl.formatMessage({
                        id: "AUTH.VALIDATION.INVALID_LOGIN",
                      })
                    );
                  });
              }, 1000);
            }}
          >
            {({ values, status, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form noValidate={true} autoComplete="off" className="kt-form" onSubmit={handleSubmit} style={{ marginTop: -10 }}>
                <div className="form-group">
                  <TextField
                    type="email"
                    label="Email"
                    margin="normal"
                    className="kt-width-full"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    type="password"
                    margin="normal"
                    label="Password"
                    className="kt-width-full"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                  />
                </div>

                <div className="kt-login__actions">
                  <Link to="/auth/forgot-password" className="kt-link kt-login__link-forgot">
                    <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                  </Link>

                  <button
                    id="kt_login_signin_submit"
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx({
                      "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                    })}`}
                    style={loadingButtonStyle}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default injectIntl(connect(mapStateToProps, { updateUserData })(withRouter(Login)));
