import * as PlaylistTypes from "./playlist-types";

export const play = (playlist) => ({
  type: PlaylistTypes.PLAY_PLAYLIST,
  payload: playlist,
});

export const setCurrentPlaylist = (playlist) => {
  return play(playlist);
};

export const edit = (playlist) => ({
  type: PlaylistTypes.EDIT_PLAYLIST,
  payload: playlist,
});

export const setEditingPlaylist = (playlist) => {
  return edit(playlist);
};
