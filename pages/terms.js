import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import NoSSR from "react-no-ssr";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import GoTop from "../components/Layouts/GoTop";
import PageTitle from "../components/terms/PageTitle";
import AboutArea from "../components/terms/AboutArea";
import Head from "next/head";

class About extends React.Component {
  render() {
    return (
      <NoSSR>
        <Preloader>
          <Placeholder>
            <div className="preloader">
              <div className="spinner"></div>
            </div>
          </Placeholder>
          <Header />
          <PageTitle />
          <AboutArea />
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </Preloader>
        <Head>
          <title>Terms & Condition | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default About;
