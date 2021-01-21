import React from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import NoSSR from "react-no-ssr";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import ReactPage from "../../components/docs/React";
import Head from "next/head";
import DocsContainer from "../../components/Layouts/DocsContainer";

class DocsReact extends React.Component {
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
          <DocsContainer>
            <ReactPage />
          </DocsContainer>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </Preloader>
        <Head>
          <title>Overview | REST APIs | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    );
  }
}

export default DocsReact;
