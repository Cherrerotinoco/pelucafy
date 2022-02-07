import * as TrackTypes from "./track-types";

export const TrackInitialState = {
  name: null,
  source: null,
  image: null,
  genre: null,
  album: null,
};

const AuthReducer = (state = TrackInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TrackTypes.PLAY_TRACK: {
      return {
        ...state,
        name: payload.name,
        source: payload.source,
      };
    }

    default: {
      return state;
    }
  }
};

export default AuthReducer;
