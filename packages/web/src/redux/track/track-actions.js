import * as TrackTypes from "./track-types";

export const play = (track) => ({
  type: TrackTypes.PLAY_TRACK,
  payload: track,
});

export const setCurrentTrack = (track) => {
  return play(track);
};
