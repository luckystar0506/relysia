import React, { useEffect, useState } from "react";
import { Preloader, Placeholder } from "react-preloading-screen";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import GoTop from "../components/Layouts/GoTop";
import PageTitle from "../components/profile/PageTitle";
import ProfileView from "../components/profile/ProfileView";
import firebase from "../config/fire-conf";
import { useRouter } from "next/router";
import Head from "next/head";

function Features() {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth/login");
      }
    });
  }, []);

  return (
    <Preloader>
      <Placeholder>
        <div className="preloader">
          <div className="spinner"></div>
        </div>
      </Placeholder>
      <Header />
      <PageTitle />
      <ProfileView />

      <Footer />
      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Profile | MetaShard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </Preloader>
  );
}

export default Features;
