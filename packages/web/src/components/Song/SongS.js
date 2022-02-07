import React from "react";
import { FaPlay, FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";

const SongS = ({ song }) => {
  const { title, thumbnail, genre, albums, url } = song;

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

          <a href={url} className="absolute -right-2 bottom-2   -ml-3">
            <button
              className="flex-no-shrink bg-green-400 hover:bg-green-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
              type="button"
            >
              <FaPlay />
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

SongS.defaultProps = {
  song: {},
};

SongS.propTypes = {
  song: PropTypes.object,
};

export default SongS;
