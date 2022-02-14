import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SongS from "./SongS";
import SongM from "./SongM";
import SongL from "./SongL";

// ! Pasar Like & Edit a componentes

const Song = ({ song, size }) => {
  return (
    <div className="song-component">
      {size === "S" && <SongS song={song} />}
      {size === "M" && <SongM song={song} />}
      {size === "L" && <SongL song={song} />}
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
