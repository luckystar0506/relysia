import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import Head from "next/head";

class Custom404 extends React.Component {
  render() {
    return (
      <Preloader>
        <Placeholder>
          <div className="preloader">
            <div className="spinner"></div>
          </div>
        </Placeholder>
        <section className="error-area">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="error-content">
                  <div className="notfound-404">
                    <h1>Oops!</h1>
                  </div>
                  <h3>404 - Page Not Found</h3>
                  <a className="btn btn-primary" href="/">
                    Go to Homepage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Head>
          <title>404 Error | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </Preloader>
    );
  }
}

export default Custom404;
