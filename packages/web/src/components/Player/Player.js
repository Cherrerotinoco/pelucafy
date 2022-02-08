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
      <div className="flex audio-controls justify-between text-white w-fit mx-4 ">
        <div className="w-1/6 text-xl">
          <button
            type="button"
            className="shuffle"
            aria-label="Shuffle"
            onClick={() => window.alert("click")}
          >
            <TiArrowShuffle />
          </button>
        </div>
        <div className="w-auto">
          <AudioPlayer
            src={trackPlaying && trackPlaying.url}
            overrideStyles
            classNames={{
              timeTrack: "w-full flex-grow",
              sliderTrack: "text-white w-40 h-1  m-2 justify-between",
              timeText: "",
            }}
          />
        </div>
        <div className="w-1/6 text-xl">
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
