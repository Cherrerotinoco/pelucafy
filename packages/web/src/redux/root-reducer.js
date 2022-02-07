import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import trackReducer from "./track/track-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  track: trackReducer,
});

export default rootReducer;
