import { combineReducers } from "redux";

import authReducer from "./auth/auth-reducer";
import trackReducer from "./track/track-reducer";
import playlistReducer from "./playlist/playlist-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  track: trackReducer,
  playlist: playlistReducer,
});

export default rootReducer;
