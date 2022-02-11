import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import {
  setCurrentTrack,
  setEditingTrack,
} from "../../redux/track/track-actions";

import SongXS from "./SongXS";
import SongS from "./SongS";
import SongM from "./SongM";
import SongL from "./SongL";

// ! Pasar Like & Edit a componentes

const Song = ({ song, size }) => {
  const dispatch = useDispatch();

  const playTrack = () => {
    dispatch(setCurrentTrack(song));
  };

  return (
    <div className="song-component">
      {size === "XS" && <SongXS song={song} playTrack={playTrack} />}
      {size === "S" && <SongS song={song} playTrack={playTrack} />}
      {size === "M" && <SongM song={song} playTrack={playTrack} />}
      {size === "L" && <SongL song={song} playTrack={playTrack} />}
    </div>
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
