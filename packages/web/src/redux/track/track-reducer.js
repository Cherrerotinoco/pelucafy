import * as TrackTypes from "./track-types";

export const TrackInitialState = {
  trackPlaying : null,
  trackEditing: null,
};

const TrackReducer = (state = TrackInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TrackTypes.PLAY_TRACK: {
      return {
        ...state,
        trackPlaying: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default TrackReducer;
