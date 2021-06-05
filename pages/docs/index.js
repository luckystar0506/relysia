import React from "react";
import NoSSR from "react-no-ssr";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import RelysiaOverviewPage from "../../components/docs/Overview";
import DocsContainer from "../../components/Layouts/DocsContainer";
import NewDocsContainer from "../../components/Layouts/NewDocsContainer";

class DocsOverview extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
          <Header />
          {/* <DocsContainer>
            <RelysiaOverviewPage />
          </DocsContainer> */}
          <NewDocsContainer data={{groupData: this.listData}} />
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
      </NoSSR>
    );
  }

 listData = [
   {
     title: "General Apis",
     desc: "In General apis, metrics, send, issue, balance and history",
     id: "general"
   },

    {
     title: "Open Apis",
     desc: "In Open Apis, Auth, details and uri",
     id: "open"
   },

    {
     title: "SMS Verification Apis",
     desc: "In SMS verification Apis, send Otp and verify Otp",
     id: "sms-verification"
   }

  ]

}

export default DocsOverview;
