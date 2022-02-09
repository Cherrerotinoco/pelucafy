import React, { useEffect, useState } from "react";
import api from "../../api";

const useTracks = ({ query, limit, order, skip }) => {
  const [trackList, setTrackList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  // On load, fetch data
  useEffect(() => {
    getTracks();
  }, []);

  const getTracks = async () => {
    try {
      const response = await api.getTracks(null, { query, limit, order, skip });

      if (response.data.error) throw Error(response.errorMessage);

      setTrackList((prevTracks) => [...prevTracks, ...response.data]);
      setPage((prevPage) => prevPage + 1);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return {
    trackList: trackList,
    error: error,
    page: page,
  };
};

export default useTracks;
