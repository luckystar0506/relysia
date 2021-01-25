import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserDataAction } from "../../store/actions/actiosMain";
import firebase from "../../config/fire-conf";
import { useRouter } from "next/router";

function GetCurrentUser() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(updateUserDataAction(user));
        // if(router.pathname === "/"){
        //   router.push("/app/wallet/vionex-wallet");
        // }
      }
    });
  }, []);

  return <></>;
}

export default GetCurrentUser;
