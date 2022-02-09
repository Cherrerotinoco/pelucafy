import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";
import api from "../../api";

const useTracks = ({ query, limit, order, skip }) => {
  const [trackList, setTrackList] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const { trackEditing } = useSelector(trackSelector);
  // On load, fetch data
  // useEffect(() => {
  //   getTracks();
  // }, []);

  useEffect(() => {
    if (Object.entries(trackEditing).length == 0) {
      getTracks();
      console.log("soy el useEffect");
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
