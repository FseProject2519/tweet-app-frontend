import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import trendsReducer from "./TrendsReducer";
import userReducer from "./UserReducer";
import imageReducer from "./ImageReducer";

const reducers = combineReducers({
  authReducer,
  postReducer,
  trendsReducer,
  userReducer,
  imageReducer,
});

export default reducers;
