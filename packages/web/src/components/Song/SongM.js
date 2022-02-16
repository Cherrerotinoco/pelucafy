import React from "react";
import PropTypes from "prop-types";
import Play from "./Play";

/**
 * Render songM card component used in EditPLaylist page
 * @param {*} params  {song={song to print data}}
 * @returns JSX tailwind styled component
 */
const SongM = ({ song }) => {
  const { title, thumbnail } = song;

  return (
    <>
      <div className="flex-none sm:flex p-4 ">
        <div className=" relative h-28 w-28 light sm:mb-0 mb-3">
          <img
            src={thumbnail}
            alt={title}
            className=" w-28 h-28 object-cover light"
          />
          <div className="absolute top-2   ml-2 text-white font-bold leading-none">
            {title}
          </div>

          <Play song={song} />
        </div>
      </div>
    </>
  );
};

SongM.defaultProps = {
  song: {},
};

SongM.propTypes = {
  song: PropTypes.object,
};

export default SongM;
