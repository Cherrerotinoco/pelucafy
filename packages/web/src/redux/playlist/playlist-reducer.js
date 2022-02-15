import * as PlaylistTypes from "./playlist-types";

export const PlaylistInitialState = {
  playlistPlaying: {},
  playlistEditing: {},
};

const PlaylistReducer = (state = PlaylistInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PlaylistTypes.PLAY_PLAYLIST: {
      return {
        ...state,
        playlistPlaying: payload,
      };
    }
    case PlaylistTypes.EDIT_PLAYLIST: {
      return {
        ...state,
        playlistEditing: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default PlaylistReducer;
