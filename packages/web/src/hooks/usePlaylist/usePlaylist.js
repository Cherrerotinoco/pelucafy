import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import api from "../../api";

/**
 * Custom Hook thath takes playlists from the db by query params
 * @param {} param { query={collection property to find in DB}, limit={number of results}, order={orderBy}, skip={results to skip} }
 * @returns {    trackList: {tracks|Objectlist}, error: {error message|Sting}, page:{number of pages|String},}
 */
const usePlaylist = ({ query, limit, order, skip }) => {
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(null);
  const { playlistEditing } = useSelector(playlistSelector);

  useEffect(() => {
    if (Object.entries(playlistEditing).length === 0) {
      getPlaylists();
    }
  }, [playlistEditing]);

  const getPlaylists = async () => {
    try {
      const response = await api.getPlaylists(null, {
        query,
        limit,
        order,
        skip,
      });

      if (response.data.error) throw Error(response.errorMessage);

      setPlaylist(response.data);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return {
    playlist: playlist,
    error: error,
  };
};

export default usePlaylist;
