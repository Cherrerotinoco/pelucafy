import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentTrack } from "../../redux/track/track-actions";


import SongXS from "./SongXS";
import SongS from "./SongS";
import SongM from "./SongM";
import SongL from "./SongL";


const Song = ({ song, size }) => {

  
  const dispatch = useDispatch();
  const [like, setLike] = useState(null);

  const playTrack = () => {
    dispatch(
      setCurrentTrack(song),
    );
  };

  const likeTrack = () => {
    if (like) {
      // Send like to DB
    }
  };

  return (
    <>
      {size === "XS" && <SongXS song={song} playTrack={playTrack} />}
      {size === "S" && <SongS song={song} playTrack={playTrack} />}
      {size === "M" && <SongM song={song} playTrack={playTrack} />}
      {size === "L" && <SongL song={song} playTrack={playTrack} />}
    </>
  );
};

Song.defaultProps = {
  song: {},
  size: "S",
};

Song.propTypes = {
  song: PropTypes.object,
  size: PropTypes.string,
};

export default Song;
