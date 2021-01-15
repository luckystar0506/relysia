import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "vionex-pay-button/dist/index.css";
import "../static/css/bootstrap.min.css";
import "../static/css/slick.css";
import "../static/css/animate.css";
import "../static/css/flaticon.css";
import "../static/css/boxicons.min.css";
import "odometer/themes/odometer-theme-default.css";
import "react-toastify/dist/ReactToastify.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-image-lightbox/style.css";
import "../static/styles/style.css";
// If you want to change the theme color you should comment out above line and uncomment the below line and change the color names from list
/*
 * brink-pink-style.css
 * pink-style.css
 * purple-style.css
 */
import "../static/styles/brink-pink-style.css";
import "../static/css/responsive.css";
import "../static/css/custom.css";

import { Provider } from "react-redux";
import App from "next/app";
import { DefaultSeo } from "next-seo";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store/reducers/authReducer";
import React from "react";
import GetCurrentUser from "../components/Layouts/GetCurrentUser";

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <>
          <DefaultSeo
            title="Relysia - The Bitcoin database"
            description="Relysia is a Bitcoin database, helping developers build robust applications on the blockchain."
            openGraph={{
              type: "website",
              locale: "en_IE",
            }}
          />
          <Provider store={store}>
            <GetCurrentUser />
            <Component {...pageProps} />
          </Provider>
        </>
      );
    }
  }
);
