import React, { useEffect } from "react";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import GoTop from "../../components/Layouts/GoTop";
import MainBanner from "../../components/login/MainBanner";
import { useRouter } from "next/router";
import firebase from "../../config/fire-conf";
import Head from "next/head";

function Login() {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.push("/app/wallet/vionex-wallet");
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <MainBanner />
      <Footer />
      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Login | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  );
}

export default Login;
