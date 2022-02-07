import React from "react";
import AudioPlayer from "react-audio-element";
import { useSelector } from "react-redux";
import { trackSelector } from "../../redux/track/track-selectors";

// !
import { Elements } from "../../components/elements";
import Song from "../../components/Song";

// !

const NowPlaying = () => {
  const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;

  // const {track} = useSelector(trackSelector)
  const track = {
    source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };
  return (
    <>
      {track && (
        <>
          <AudioPlayer src={track.source} />
        </>
      )}
    </>
  );

  /*
  return (
      <div className="flex-no-shrink">
        <Song song={track} key={song._id.$oid} size="L" />
      </div>
  );
  */
};

export default NowPlaying;
