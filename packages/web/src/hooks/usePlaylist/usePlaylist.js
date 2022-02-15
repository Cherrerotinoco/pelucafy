import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import api from "../../api";

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
