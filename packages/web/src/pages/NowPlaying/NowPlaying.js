import React from "react";

import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";
import SongL from "../../components/Song/SongL";

/**
 *  NowPlaying Page rendered in the user control panel, showing the track ready to play
 * @returns  JSX Page with tailwind styled components
 */
const NowPlaying = () => {
  const { trackPlaying } = useSelector(trackSelector);

  return (
    <div className="flex-no-shrink">
      {trackPlaying && <SongL song={trackPlaying} />}
    </div>
  );
};

export default NowPlaying;
