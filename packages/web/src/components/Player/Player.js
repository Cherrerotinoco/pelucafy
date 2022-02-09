import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  CgPlayTrackPrevO,
  CgPlayTrackNextO,
  CgPlayButtonO,
  CgPlayPauseO,
} from "react-icons/cg";
import ReactAudioPlayer from 'react-audio-player';
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

  return (
    <div className=" p-2 m-2  outline-white">
      <div className="flex audio-controls justify-between text-white w-fit mx-4 ">
        <div className="w-1/6 text-xl">
          <button
            type="button"
            className="shuffle"
            aria-label="Shuffle"          >
            <TiArrowShuffle />
          </button>
        </div>
        <div className="w-auto">
          <ReactAudioPlayer
            autoPlay
            controls
            src={trackPlaying && trackPlaying.url}
          />

        </div>
        <div className="w-1/6 text-xl">
          <button
            type="button"
            className="next"
            aria-label="Repeat"
          >
            <TiArrowRepeatOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
