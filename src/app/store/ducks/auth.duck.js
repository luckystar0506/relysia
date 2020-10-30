import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as routerHelpers from "../../router/RouterHelpers";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const actionTypes = {
  UserLoggedData: "[User] USER LOGGED DATA",
  UserProilePicUpdated: "[User] PROFILE PIC UPDATE",
  updateTutorStatus: "[] updateTutorStatus",
  userStatus: "[] userStatus",
  userWalletsData: "[] update wallets data",
};

const initialAuthState = {
  user: null,
  authToken: undefined,
  updateProfilePic: false,
  profilePicUrl: "",
  updateTutorStatus: false,
  walletsData: null,
};

export const reducer = persistReducer(
  { storage, key: "demo2-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.UserProilePicUpdated: {
        return {
          ...state,
          updateProfilePic: action.payload.type,
          profilePicUrl: action.payload.url,
        };
      }

      case actionTypes.updateTutorStatus: {
        return { ...state, updateTutorStatus: !state.updateTutorStatus };
      }

      case actionTypes.UserLoggedData: {
        return {
          ...state,
          user: action.payload,
        };
      }
      case actionTypes.userWalletsData: {
        return {
          ...state,
          walletsData: action.payload,
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {};
export function updateProfilePicFunc(value) {
  return { type: actionTypes.UserProilePicUpdated, payload: value };
}

export function updateUserData(value) {
  return { type: actionTypes.UserLoggedData, payload: value };
}

export function updateUserWalletsData(value) {
  return { type: actionTypes.userWalletsData, payload: value };
}


export function* saga() {}