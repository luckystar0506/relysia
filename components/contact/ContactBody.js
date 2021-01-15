import React from "react";
import Link from "next/link";
import * as Icon from "react-feather";
import "isomorphic-fetch";
import HubspotForm from "react-hubspot-form";
import CustomLoader from "../Layouts/CustomLoader";

export default class ContactBody extends React.Component {
  state = {
    submitting: false,
    submitted: false,
    buttonState: "",
    formFields: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      text: "",
    },
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state.formFields;
    fetch("/api/contact", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.status === 200 ? this.setState({ submitted: true }) : "";
      let formFields = Object.assign({}, this.state.formFields);
      formFields.name = "";
      formFields.email = "";
      formFields.phone = "";
      formFields.subject = "";
      formFields.text = "";
      this.setState({ formFields });
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="contact-info-area ptb-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="contact-info-box">
                  <div className="icon">
                    <Icon.Mail />
                  </div>
                  <h3>Mail Here</h3>
                  <p>
                    <Link href="#">
                      <a>admin@Relysia.com</a>
                    </Link>
                  </p>
                  <p>
                    <Link href="#">
                      <a>info@Relysia.com</a>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="contact-info-box">
                  <div className="icon">
                    <Icon.Map />
                  </div>
                  <h3>Visit Here</h3>
                  <p>
                    27 Division St, New York, NY 10002, <br /> USA
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                <div className="contact-info-box">
                  <div className="icon">
                    <Icon.Phone />
                  </div>
                  <h3>Call Here</h3>
                  <p>
                    <Link href="#">
                      <a>+123 456 7890</a>
                    </Link>
                  </p>
                  <p>
                    <Link href="#">
                      <a>+241 452 4526</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact-area ptb-80"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <div className="container">
            <div className="section-title">
              <h2>Get In Touch With Us</h2>
              <div className="bar"></div>
              <p>Anything On your Mind. We’ll Be Glad To Assist You!</p>
            </div>

            <div
              className="row h-100 justify-content-center align-items-center"
              style={{ alignItems: "center" }}
            >
              <div className="col-lg-5 col-md-12 hubspot-img-con">
                <img
                  src={require("../../static/images/about-one.png")}
                  alt="image"
                />
              </div>

              <div className="col-lg-6 col-md-12 hubspot-form-con">
                <HubspotForm
                  portalId="9108872"
                  formId="bd3f8434-9472-4c1e-ba2b-c22ad171e03b"
                  onSubmit={() => console.log("Submit!")}
                  onReady={(form) => console.log("Form ready!")}
                  loading={
                    <div>
                      <CustomLoader />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
