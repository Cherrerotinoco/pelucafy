import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";
import api from "../../api";

/**
 * Custom Hook thath takes songs from the db by query params
 * @param {} param { query={collection property to find in DB}, limit={number of results}, order={orderBy}, skip={results to skip} }
 * @returns {    trackList: {tracks|Objectlist}, error: {error message|Sting}, page:{number of pages|String},}
 */
const useTracks = ({ query, limit, order, skip }) => {
  const [trackList, setTrackList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const { trackEditing } = useSelector(trackSelector);

  useEffect(() => {
    if (Object.entries(trackEditing).length === 0) {
      getTracks();
    }
  }, [trackEditing]);

  const getTracks = async () => {
    try {
      const response = await api.getTracks(null, { query, limit, order, skip });

      if (response.data.error) throw Error(response.errorMessage);

      setTrackList(response.data);
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
