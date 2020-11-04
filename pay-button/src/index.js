import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var config = {
  apiKey: "AIzaSyDiAjG-iuYAORff9qoaQQHVAaBzU49HViM",
  authDomain: "vaionexdev.firebaseapp.com",
  projectId: "vaionexdev",
  messagingSenderId: "540169846332",
  appId: "1:540169846332:web:f3c5e00aa07b48d2db8d39",
  measurementId: "G-2SF16EW2KV",
  databaseURL: "https://vaionexdev.firebaseio.com/",
};
firebase.initializeApp(config);

ReactDOM.render(
  <SnackbarProvider maxSnack={6}>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
