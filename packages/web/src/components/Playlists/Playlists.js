import React, { useEffect } from "react";
import usePlaylist from "../../hooks/usePlaylist/usePlaylist";

/**
 * Actions:
 * - Allow to create a playlist
 * - Get playlists by current userId
 * - Edit certain playlist
 * - Render the tracks for each playlist
 * @returns All the playlists of the current user
 */

function Playlists() {
  // const [playlist, error] = usePlaylist();

  return (
    <div>
      <button type="button">Add playlist</button>
      {/* <div>{playlist && playlist.map((elm) => <p key={elm._id}>elm</p>)}</div> */}
    </div>
  );
}

export default Playlists;
