import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import "bootstrap-social/bootstrap-social.css";
import Button from "@material-ui/core/Button";

var googleProvider = new firebase.auth.GoogleAuthProvider();
var githubProvider = new firebase.auth.GithubAuthProvider();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  gitBtn: {
    backgroundColor: "#444",
  },
  socialLogCon: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    padding: 2,
    width: "100%",
    padding: "8px 10px",
    cursor: "pointer",
    marginBottom: 10,
    borderRadius: 5,
  },
  LogTextField: {
    width: "100%",
    margin: 0,
    marginBottom: 6,
  },
}));

function LoginPopup(props) {
  const classes = useStyles();
  let { openLoginPopup, setLoginPopup } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    props.setLoginPopup(false);
  };

  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        props.setLoginPopup(false);
        props.sendBsv(null, true);
      })
      .catch(function (error) {
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
      .then(function (result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        if (props.isPopup) {
          props.setLoginPopup(false);
          props.sendBsv(null, true);
        }
      })
      .catch(function (error) {
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

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <>
      <Dialog
        open={openLoginPopup}
        onEscapeKeyDown={() => handleClose()}
        onClose={() => handleClose()}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <div style={{ color: "#67666e", height: "100%", backgroundColor: "#fff", width: "100%", margin: "10px 0px 40px 0px" }}>
            <div>
              <Typography variant="h3" component="h1" style={{ textAlign: "center", fontSize: "2rem", fontWeight: 100 }}>
                Login Account
              </Typography>
            </div>
            <div style={{ margin: "0px auto", marginTop: 60, width: "90%" }}>
              <div onClick={signInWithGoogle} className={clsx(classes.socialLogCon, "btn-google text-white")}>
                <div className="fa fa-google text-white" style={{ width: "10%" }}></div>
                <div style={{ width: "80%", textAlign: "center" }}>Sign in with Google</div>
              </div>
              <div className={clsx(classes.socialLogCon, classes.gitBtn, "btn-github text-white")} onClick={signInWithGithub}>
                <div className="fa fa-github text-white" style={{ width: "10%" }}></div>
                <div style={{ width: "80%", textAlign: "center" }}> Sign in with Github</div>
              </div>
            </div>
            <p style={{ textAlign: "center", margin: "25px 0px 5px 0px" }}>OR</p>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};

                if (!values.email) {
                  errors.email = "Required field";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Field is not valid";
                }

                if (!values.password) {
                  errors.password = "Required field";
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

                      props.setLoginPopup(false);
                      props.sendBsv(null, true);
                    })
                    .catch((error) => {
                      disableLoading();
                      setSubmitting(false);
                      enqueueSnackbar(error.message, {
                        variant: "error",
                      });
                      setStatus("The login detail is incorrect");
                    });
                }, 1000);
              }}
            >
              {({ values, status, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form
                  noValidate={true}
                  autoComplete="off"
                  style={{ width: "90%", margin: "0px auto", marginTop: -10 }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    type="email"
                    label="Email"
                    margin="normal"
                    className={classes.LogTextField}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />

                  <TextField
                    type="password"
                    margin="normal"
                    label="Password"
                    className={classes.LogTextField}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                  />

                  <div style={{ display: "flex", marginTop: 15 }}>
                    {/* <Link to="/auth/forgot-password" className="kt-link kt-login__link-forgot">
                    Forgot Password
                  </Link> */}

                    <Button
                      id="kt_login_signin_submit"
                      type="submit"
                      disabled={isSubmitting}
                      style={{ marginTop: 20, marginLeft: "auto" }}
                      variant="contained"
                      color="primary"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginPopup;
