import React from "react";
import NoSSR from "react-no-ssr";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import ZapsPage from "../../components/zaps/index";
import DashboardSidebar from "../../components/Layouts/DashboardSidebar";
import Head from "next/head";

class Zaps extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
         
          <Header />
          <DashboardSidebar>
            <ZapsPage />
          </DashboardSidebar>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
        <Head>
          <title>Connect with Zapier | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default Zaps;
