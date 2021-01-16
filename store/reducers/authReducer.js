import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import { USER_DATA_UPDATE } from "../actions/actiosMain";

const initState = {
  userData: null,
};

const authReducer = (state = initState, action) => {
  if (action.type === USER_DATA_UPDATE) {
    return {
      ...state,
      userData: action.payload,
    };
  } else {
    return state;
  }
};

export const initStore = (initialState = initState) => {
  return createStore(
    authReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
