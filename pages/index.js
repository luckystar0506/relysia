import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import NoSSR from "react-no-ssr";
import Header from "../components/Layouts/Header";
import MainBanner from "../components/home-one/MainBanner";
import BoxArea from "../components/home-one/BoxArea";
import Pricing from "../components/home-one/Pricing";
import Footer from "../components/Layouts/Footer";
import GoTop from "../components/Layouts/GoTop";
import WhyChoose from "../components/home-one/WhyChoose";
import Features from "../components/home-one/Features";
import Head from "next/head";

class Index extends React.Component {
  render() {
    return (
      <NoSSR>
        <Preloader>
          <Placeholder>
            <div className="preloader">
              <div className="spinner"></div>
            </div>
          </Placeholder>
          {/* Relysia/components/Layouts/Header.js */}
          <Header />
          {/* Relysia/components/home-one/MainBanner.js */}
          <MainBanner />
          {/* Relysia/components/home-one/BoxArea.js */}
          <BoxArea />
          <WhyChoose />
          <Features />
          <Pricing />

          {/* Relysia/components/Layouts/Footer.js */}
          <Footer />
          {/* Relysia/components/Layouts/GoTop.js */}
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </Preloader>
        <Head>
          <title>Relysia - The Bitcoin database</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default Index;