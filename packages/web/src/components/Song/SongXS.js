import React from "react";
import { FaPlay, FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";
import { Elements } from "../elements";

import Like from "./Like";
import Edit from "./Edit";

const SongXS = ({ song, playTrack, editTrack, likeTrack }) => {
  const { title, thumbnail, genre, albums, url, likedBy, _id } = song;
  const { Card, Title, Label } = Elements;

  return (
    <>
      <Card padding="1">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className=" w-20 mx-5">
            <img src={thumbnail} alt={title} className="object-cover " />
          </div>
          <div className="w-1/6 text-lg text-white font-bold leading-none ">
            {title}
          </div>

          <div className="w-1/6 text-base text-white font-bold leading-none ">
            {albums.length !== 0 && (
              <>
                <span className="mr-3 border-r text-white  max-h-0" />
                <span>{albums}</span>
              </>
            )}
          </div>
          <div className="w-1/6 flex-none text-base text-white font-bold leading-none ">
            <span className="mr-3 ">{genre}</span>
          </div>
          <div className="w-1/6 flex-none text-base text-white font-bold leading-none ">
            <div className="flex-1 flex-col inline-flex items-center mx-1 ">
              <FaMusic />
              <p className="">2.5k</p>
            </div>
            <div className="flex-1 flex-col inline-flex items-center mx-1">
              <FaHeart />
              <p className="">14</p>
            </div>
          </div>
          <div className="w-1/5 block text-base text-white font-bold leading-none">
            <Edit song={song} />

            <Like likedBy={likedBy} songId={_id} />

            <button
              className="bg-green-400 hover:bg-green-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
              type="button"
              onClick={playTrack}
            >
              <FaPlay />
            </button>
          </div>

          {/*  */}
        </div>
      </Card>
    </>
  );
};

SongXS.defaultProps = {
  song: {},
  editTrack: null,
  playTrack: null,
  likeTrack: null,
};

SongXS.propTypes = {
  song: PropTypes.object,
  editTrack: PropTypes.func,
  playTrack: PropTypes.func,
  likeTrack: PropTypes.func,
};

export default SongXS;
