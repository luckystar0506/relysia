import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import GoTop from "../components/Layouts/GoTop";
import PageTitle from "../components/contact/PageTitle";
import ContactBody from "../components/contact/ContactBody";
import Head from "next/head";

export default () => (
  <Preloader>
    <Placeholder>
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    </Placeholder>
    <Header />
    <PageTitle />
    <ContactBody />
    <Footer />
    <GoTop scrollStepInPx="50" delayInMs="16.66" />
    <Head>
      <title>Contact | Relysia</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  </Preloader>
);
