import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import ServicesContent from "../../components/services/ServicesContent";
import Head from "next/head";

class Features extends React.Component {
  render() {
    return (
      <Preloader>
        <Placeholder>
          <div className="preloader">
            <div className="spinner"></div>
          </div>
        </Placeholder>
        <Header />
        <ServicesContent />
        <Footer />
        <GoTop scrollStepInPx="50" delayInMs="16.66" />
        <Head>
          <title>Services | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </Preloader>
    );
  }
}

export default Features;
