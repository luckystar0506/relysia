import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import NoSSR from "react-no-ssr";
import Header from "../../../components/Layouts/Header";
import Footer from "../../../components/Layouts/Footer";
import GoTop from "../../../components/Layouts/GoTop";
import WalletPage from "../../../components/wallet/index";
import DashboardSidebar from "../../../components/Layouts/DashboardSidebar";
import Head from "next/head";

class CustomWalletPage extends React.Component {
  render() {
    console.log("not default");

    return (
      <NoSSR>
        <Preloader>
          <Placeholder>
            <div className="preloader">
              <div className="spinner"></div>
            </div>
          </Placeholder>
          <Header />
          <DashboardSidebar>
            <WalletPage />
          </DashboardSidebar>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </Preloader>
        <Head>
          <title>Wallet | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default CustomWalletPage;
