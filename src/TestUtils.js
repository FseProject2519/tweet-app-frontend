import reducers from "./reducers";

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const storeFactory = (initialState) => {
  return createStore(reducers, initialState, applyMiddleware(thunk, logger));
};
