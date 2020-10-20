/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./_metronic/_assets/sass/pages/login/login-1.scss";

import ReactDOM from "react-dom";
import store, { persistor } from "./app/store/store";
import App from "./App";

import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
// IE 11 polyfills
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
// Fonts
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/line-awesome/css/line-awesome.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/agate.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const { PUBLIC_URL } = process.env;

// #change
//production config
// var config = {
//   apiKey: "AIzaSyCiSQJwksuuGNMPq3GjkY_ZM1MTBsDzZrk",
//   authDomain: "hivedb-cdbf7.firebaseapp.com",
//   databaseURL: "https://sato-cdbf7-59abe.firebaseio.com/",
//   projectId: "hivedb-cdbf7",
//   storageBucket: "hivedb-cdbf7.appspot.com",
//   messagingSenderId: "882176606224",
//   appId: "1:882176606224:web:1d8167f258eb2e92680a95",
//   measurementId: "G-BR9BQ9KP55",
// };
// firebase.initializeApp(config);
// export const DB1 = firebase.app().database("https://vaionexusers.firebaseio.com/");
// end production config

////////////////////////////
//development config
var config = {
  apiKey: "AIzaSyDiAjG-iuYAORff9qoaQQHVAaBzU49HViM",
  authDomain: "vaionexdev.firebaseapp.com",
  databaseURL: "https://wallet-vionex-dev.firebaseio.com/",
  projectId: "vaionexdev",
  storageBucket: "vaionexdev.appspot.com",
  messagingSenderId: "540169846332",
  appId: "1:540169846332:web:f3c5e00aa07b48d2db8d39",
  measurementId: "G-2SF16EW2KV",
};

firebase.initializeApp(config);
export const DB1 = firebase.app().database("https://vaionexdev.firebaseio.com/");
//end development config

ReactDOM.render(<App store={store} persistor={persistor} basename={PUBLIC_URL} />, document.getElementById("root"));
