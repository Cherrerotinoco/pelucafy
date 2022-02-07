import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CgPlayTrackPrevO,
  CgPlayTrackNextO,
  CgPlayButtonO,
  CgPlayPauseO,
} from "react-icons/cg";
import AudioPlayer from "react-audio-element";
import { TiArrowRepeatOutline, TiArrowShuffle } from "react-icons/ti";
import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";

const Player = () => {
  // ? const audioElement = new Audio(audio source);
  // ? audioElement.play();
  // ? audioElement.pause();

  // ? audioElement.currentTime;
  // ? audioElement.ended;
  // ? audioElement.duration;

  const { trackPlaying } = useSelector(trackSelector);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className=" p-2 m-2  outline-white">
      <AudioPlayer src={trackPlaying && trackPlaying.url} />

      <div className=" px-4">
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max="100"
          className="progress w-full"
          onChange={() => window.alert("taraaa")}
          onMouseUp={() => window.alert("taraaa")}
          onKeyUp={() => window.alert("taraaa")}
        />
      </div>

      <div className="flex audio-controls justify-around text-white text-xl text-bold w-full mx-4 ">
        <div className="w-1/5 text-3xl">
          <button
            type="button"
            className="shuffle"
            aria-label="Shuffle"
            onClick={() => window.alert("click")}
          >
            <TiArrowShuffle />
          </button>
        </div>

        <div className="w-1/5 text-3xl">
          <button
            type="button"
            className="next"
            aria-label="Repeat"
            onClick={() => window.alert("click")}
          >
            <TiArrowRepeatOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
