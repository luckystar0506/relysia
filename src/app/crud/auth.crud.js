import * as firebase from "firebase";

export function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {})
    .catch((error) => {});
}
