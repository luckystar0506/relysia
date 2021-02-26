// config/fire-config.js
import firebase from "firebase";
import "firebase/storage";
import "firebase/analytics";
const MODE = "PROD";

//DEV or PROD
const firebaseConfig =
  MODE === "DEV"
    ? {
        apiKey: "AIzaSyDiAjG-iuYAORff9qoaQQHVAaBzU49HViM",
        authDomain: "vaionexdev.firebaseapp.com",
        databaseURL: "https://wallet-vionex-dev.firebaseio.com/",
        projectId: "vaionexdev",
        storageBucket: "vaionexdev.appspot.com",
        messagingSenderId: "540169846332",
        appId: "1:540169846332:web:f3c5e00aa07b48d2db8d39",
        measurementId: "G-2SF16EW2KV",
      }
    : 
      {
        apiKey: "AIzaSyCGzjD8zb2yJzRi6W54FJvfj55CWu_36q4",
        authDomain: "hivedb-cdbf7.firebaseapp.com",
        databaseURL: "https://relysia-9e4c5.firebaseio.com/",
        projectId: "hivedb-cdbf7",
        storageBucket: "hivedb-cdbf7.appspot.com",
        messagingSenderId: "882176606224",
        appId: "1:882176606224:web:4b5a448b3bf607e1680a95",
        measurementId: "G-89Z5B2W3KM"
      }
      ;
var db1Url =
  MODE === "DEV"
    ? "https://vaionexdev.firebaseio.com/"
    : "https://vaionexusers.firebaseio.com/";

var tokensFirebaseUrl = MODE === "DEV" ? "gs://wallettokens_vionex/" : "gs://relysia-cdbf8/";

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
export const DB1 = firebase.app().database(db1Url);

export const tokensFirebaseStorage = firebase
  .app()
  .storage(tokensFirebaseUrl)
  .ref();

const fire = firebase;
export default fire;
