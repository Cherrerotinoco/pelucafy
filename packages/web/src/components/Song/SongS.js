import React from "react";
import { useSelector } from "react-redux";

import { FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";
import { Elements } from "../elements";
import { authSelector } from "../../redux/auth/auth-selectors";

import Like from "./Like";
import Edit from "./Edit";
import Play from "./Play";

/**
 * Render songS card component used in Search,My Songs and Home pages
 * @param {*} params  {song={song to print data}}
 * @returns JSX tailwind styled component
 */
const SongS = ({ song }) => {
  const { currentUser } = useSelector(authSelector);
  const { title, thumbnail, genre, albums, likedBy, _id } = song;
  const { Card } = Elements;

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
            {song.userId === currentUser._id ? <Edit song={song} /> : null}

            <Like likedBy={likedBy} songId={_id} />

            <Play song={song} />
          </div>

          {/*  */}
        </div>
      </Card>
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
