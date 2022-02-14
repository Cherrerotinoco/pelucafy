import React, { useEffect } from 'react'
import usePlaylists from '../../hooks/usePlaylists/usePlaylists'

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
        {data && data.map(elm => <p key={elm._id}>elm</p>)}
      </div>
    </div>
  )
}

export default Playlists