import React from "react";
import NoSSR from "react-no-ssr";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import DashboardPage from "../../components/dashboard/index";
import DashboardSidebar from "../../components/Layouts/DashboardSidebar";
import Head from "next/head";

class Dashboard extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
         
          <Header />
          <DashboardSidebar>
            <DashboardPage />
          </DashboardSidebar>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
        <Head>
          <title>Dashboard | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default Dashboard;
