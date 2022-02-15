import React from 'react'
import PropTypes from "prop-types";

import './style.css'

function PlaylistCard({
  name,
  description,
  coverThumbnail,
  numberSongs,
  followers
}) {
  return (
    <div>
      <div>
        <img src={coverThumbnail} />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div>
        <span>Tracks: {numberSongs}</span>
        <span>followers: {numberSongs}</span>
      </div>
    </div>
  )
}

PlaylistCard.defaultProps = {
  name: '',
  description: '',
  coverThumbnail: '',
  numberSongs: 0,
  followers: 0
}

PlaylistCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  coverThumbnail: PropTypes.string,
  numberSongs: PropTypes.number,
  followers: PropTypes.number
}

export default PlaylistCard