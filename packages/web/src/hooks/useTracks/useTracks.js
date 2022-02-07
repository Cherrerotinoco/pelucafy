import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { Elements } from "../../components/elements";

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

  // return (
  //   <div>
  //     {error && <p>{error}</p>}
  //     {trackList && trackList.length > 0 && trackList.map(elm => {
  //         // Track Component
  //         return <p key={elm._id}>{elm.title}</p>
  //     })}

  //     <Button type='button' onClick={() => getTracks({skip: page})}>Load More // current {page}</Button>

  //   </div>
  // )
};

// TrackList.defaultProps = {
//   fromUser: null,
//   byUser: null,
//   genres: null,
//   playlist: null,
//   popularity: null,
//   rating: null,
// };

// TrackList.propTypes = {
//   fromUser: PropTypes.number,
//   byUser: PropTypes.number,
//   genres: PropTypes.string,
//   playlist: PropTypes.number,
//   popularity: PropTypes.bool,
//   rating: PropTypes.number,
// };

export default useTracks;
