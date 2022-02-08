import * as TrackTypes from "./track-types";

export const play = (track) => ({
  type: TrackTypes.PLAY_TRACK,
  payload: track,
});

export const setCurrentTrack = (track) => {
  return play(track);
};

export const edit = (track) => ({
  type: TrackTypes.EDIT_TRACK,
  payload: track,
});

export const setEditingTrack = (track) => {
  return edit(track);
};
