import React, { useEffect, useState } from 'react';
import PropTypes, { bool } from "prop-types";
import api from '../../api';

const TrackList = ({ 
  fromUser, 
  byUser, 
  genres, 
  playlist,
  popularity,
  rating, 
  ...props
}) => {

  const [trackList, setTrackList] = useState([])
  const [error, setError] = useState(null)
  const [currentTracksLength, setCurrentTracksLength] = useState(0)

  // On load, fetch data
  useEffect(() => {
    getTracks({})
  }, [])

  const getTracks = async ({query, limit, order, skip}) => {

    const data = {
      query: query,
      limit: limit,
      order: order,
      skip: skip
    }

    try {
      const response = await api.getTracks(null, data);
      
      if (response.data.error) throw Error(response.errorMessage);

      setTrackList(response.data)
      setCurrentTracksLength(response.data.length)
      setError(null)
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {trackList && trackList.length > 0 && trackList.map(elm => (
          // Track Component
          <p key={elm._id}>{elm.title}</p>
      ))}

      <button type='button' onClick={() => getTracks({skip: currentTracksLength})}>Load More // current {currentTracksLength}</button>

    </div>
  )
}


TrackList.defaultProps = {
  fromUser: null, 
  byUser: null, 
  genres: null, 
  playlist: null,
  popularity: null,
  rating: null, 
}

TrackList.propTypes = {
  fromUser: PropTypes.number, 
  byUser: PropTypes.number, 
  genres: PropTypes.string, 
  playlist: PropTypes.number,
  popularity: PropTypes.bool,
  rating: PropTypes.number, 
}


export default TrackList