import React, { useEffect } from "react";
import Header from "../../../components/Layouts/Header";
import Footer from "../../../components/Layouts/Footer";
import GoTop from "../../../components/Layouts/GoTop";
import TokenDetails from "../../../components/stasTokens/tokenDetails";
import Head from "next/head";
import { useRouter } from "next/router";
import firebase from "../../../config/fire-conf";

export default () => {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth/login");
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <TokenDetails />
      <Footer />
      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Token Details | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  );
};
