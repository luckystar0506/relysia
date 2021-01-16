import React, { Component } from "react";
import Link from "next/link";
import ReactWOW from "react-wow";

class Features extends Component {
  render() {
    return (
      <section className="iot-features-area ptb-80 bg-f7fafd">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 iot-features-content">
              <h3>App Development for Connected Devices</h3>
              <p>
                The Internet of Things is fragmented at several levels: the radio networks, the mesh networks, operating systems, and connected devices.
              </p>
              <p>
                With our sharded database capabilities we can offer specialised services to developers of IoT applications.
              </p>

              <Link href="#">
                <a className="btn btn-primary">Explore More</a>
              </Link>
            </div>

            <div className="col-lg-6 iot-features-image">
              <ReactWOW delay="0.6s" animation="fadeInUp">
                <img
                  src={require("../../static/images/iot-features-image/ConnectDB.png")}
                  className="wow fadeInUp"
                  data-wow-delay="0.6s"
                  alt="image"
                />
              </ReactWOW>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Features;
