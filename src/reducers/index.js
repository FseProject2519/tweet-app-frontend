import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer";
import trendsReducer from "./TrendsReducer";

export const reducers = combineReducers({
  authReducer,
  postReducer,
  chatReducer,
  trendsReducer,
});
