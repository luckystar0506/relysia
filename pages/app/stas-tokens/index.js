import React from "react";
import NoSSR from "react-no-ssr";
import Header from "../../../components/Layouts/Header";
import Footer from "../../../components/Layouts/Footer";
import GoTop from "../../../components/Layouts/GoTop";
import StasTokenComponent from "../../../components/stasTokens/index";
import DashboardSidebar from "../../../components/Layouts/DashboardSidebar";
import Head from "next/head";

class StasTokenPage extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
          <Header />
          <DashboardSidebar>
            <StasTokenComponent />
          </DashboardSidebar>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
        <Head>
          <title>Stas Tokens | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default StasTokenPage;
