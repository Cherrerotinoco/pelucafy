import React from "react";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";

/**
 * This component render ReactAudioPlayer for play and control music
 *  {https://www.npmjs.com/package/react-audio-player}
 * @returns JSX audio player
 */
const Player = () => {
  const { trackPlaying } = useSelector(trackSelector);

  return (
    <div className=" p-2 m-2">
      <div className="flex audio-controls justify-between text-white w-fit mx-4 ">
        <div className="w-auto">
          <ReactAudioPlayer
            autoPlay
            controls
            src={trackPlaying && trackPlaying.url}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
