import React from "react";
import Link from "next/link";
import ReactWOW from "react-wow";

const MainBanner = () => {
  return (
    <div className="main-banner">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-lg-5">
                <div className="hero-content">
                  <h1>A Token Wallet</h1>
                  <p>
                    The Relysia is more than just a wallet and supports a variety of token protocols.
                  </p>

                  <Link href="#">
                    <a className="btn btn-primary">Get Started</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-6 offset-lg-1">
                <div className="banner-image">
                  <ReactWOW delay="0.5s" animation="fadeInDown">
                    <img
                      src={require("../../static/images/banner-image/heroSvg.svg")}
                      className="wow fadeInDown"
                      data-wow-delay="0.6s"
                      alt="man"
                      style={{ width: "90%", marginTop: -100 }}
                    />
                  </ReactWOW>
                  <ReactWOW delay="0.5s" animation="fadeInUp">
                    <img
                      src={require("../../static/images/banner-image/code.png")}
                      className="wow fadeInUp"
                      data-wow-delay="0.6s"
                      alt="code"
                      style={{ display: "none" }}
                    />
                  </ReactWOW>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
};

export default MainBanner;
