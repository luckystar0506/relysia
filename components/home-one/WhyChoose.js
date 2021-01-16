import React, { Component } from "react";
import ReactWOW from "react-wow";

class WhyChoose extends Component {
  render() {
    return (
      <section className="why-choose-us ptb-80 pt-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="section-title">
                <h2>Why Choose Us</h2>
                <div className="bar"></div>
                <p>
                  For Relysia services we make use of a sharded noSQL architecture that allows us to cater to the specific needs of our customers, while remaining 
                  a scalable and cheap provider.
                </p>
              </div>

              <div className="why-choose-us-image">
                <ReactWOW animation="fadeInLeft">
                  <img src={require("../../static/images/why-choose-us-image/LaptopDB.png")} className="wow fadeInLeft" alt="image" />
                </ReactWOW>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="single-why-choose-us">
                    <div className="icon">
                      <i className="flaticon-team"></i>
                    </div>
                    <h3>Proficient & Friendly</h3>
                    <p>
                      We are available 24/7 with an international team. You can put your mind to rest with Relysia.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="single-why-choose-us">
                    <div className="icon">
                      <i className="flaticon-rocket"></i>
                    </div>
                    <h3>Extremely Fast</h3>
                    <p>
                      Our databases are powered by state of the art technology unrivaled in the blockchain industry.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="single-why-choose-us">
                    <div className="icon">
                      <i className="flaticon-shield"></i>
                    </div>
                    <h3>100% Safe & Security</h3>
                    <p>
                      We have a guarantee that you will not experience any security breaches during your time with us.
                    </p>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="single-why-choose-us">
                    <div className="icon">
                      <i className="flaticon-diamond"></i>
                    </div>
                    <h3>Top-Rated</h3>
                    <p>
                      We are a tried and tested provider with many satisfied clients across the globe in prominent sectors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default WhyChoose;
