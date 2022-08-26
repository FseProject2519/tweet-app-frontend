import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import trendsReducer from "./TrendsReducer";
import userReducer from "./UserReducer";

const reducers = combineReducers({
  authReducer,
  postReducer,
  trendsReducer,
  userReducer,
});

export default reducers;
