import React, { useEffect } from 'react'
import usePlaylists from '../../hooks/usePlaylists/usePlaylists'
import PlaylistCard from '../PlaylistCard/PlaylistCard' 

/**
 * Actions:
 * - Allow to create a playlist
 * - Get playlists by current userId
 * - Edit certain playlist
 * - Render the tracks for each playlist
 * @returns All the playlists of the current user  
 */

function Playlists() {

  const [data, error] = usePlaylists()

  return (
    <div>
      <button type='button'>Add playlist</button>
      <div>
        {data && data.map(elm => (
          <PlaylistCard key={elm._id} {...elm} />
        ))}
      </div>
    </div>
  )
}

export default Playlists