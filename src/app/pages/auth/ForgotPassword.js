import React, { Component } from "react";
import { Formik } from "formik";
import  TextField  from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import firebase from "firebase/app";
import "firebase/auth";

class ForgotPassword extends Component {
  state = { isRequested: false };

  render() {
    const { intl } = this.props;
    const { isRequested } = this.state;

    if (isRequested) {
      return <Redirect to="/auth" />;
    }

    return (
      <div
        className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper"
        style={{ height: "calc(100vh - 188px)" }}
      >
        <div className="kt-login__body">
          <div className="kt-login__form">
            <div className="kt-login__title">
              <h3>
                <FormattedMessage id="AUTH.FORGOT.TITLE" />
              </h3>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validate={(values) => {
                const errors = {};

                if (!values.email) {
                  errors.email = intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                  });
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = intl.formatMessage({
                    id: "AUTH.VALIDATION.INVALID_FIELD",
                  });
                }

                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                firebase
                  .auth()
                  .sendPasswordResetEmail(values.email)
                  .then(() => {
                    this.setState({ isRequested: true });
                  })
                  .catch(function(error) {
                    alert(error);
                    setSubmitting(false);
                  });
              }}
            >
              {({ values, status, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="kt-form">
                  {status && (
                    <div role="alert" className="alert alert-danger">
                      <div className="alert-text">{status}</div>
                    </div>
                  )}

                  <div className="form-group">
                    <TextField
                      type="email"
                      label="Email"
                      margin="normal"
                      fullWidth={true}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="kt-login__actions">
                    <Link to="/auth">
                      <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">
                        Back
                      </button>
                    </Link>

                    <button type="submit" className="btn btn-primary btn-elevate kt-login__btn-primary" disabled={isSubmitting}>
                      Submit
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
}

export default ForgotPassword;
