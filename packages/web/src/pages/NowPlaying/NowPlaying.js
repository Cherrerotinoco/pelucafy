import React from "react";

import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";
import SongL from "../../components/Song/SongL";

// !

const NowPlaying = () => {

  const {trackPlaying} = useSelector(trackSelector)

  return (
      <div className="flex-no-shrink">
        <SongL song={trackPlaying} />
      </div>
  );

};

export default NowPlaying;
