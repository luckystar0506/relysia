import React from "react";
import NoSSR from "react-no-ssr";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import RelysiaOverviewPage from "../../components/docs/Overview";
import DocsContainer from "../../components/Layouts/DocsContainer";

class DocsOverview extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
          <Header />
          <DocsContainer>
            <RelysiaOverviewPage />
          </DocsContainer>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
      </NoSSR>
    );
  }
}

export default DocsOverview;
