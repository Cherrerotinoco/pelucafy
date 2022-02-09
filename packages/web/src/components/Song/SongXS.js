import React from "react";
import { FaPlay, FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";
import { Elements } from "../elements";

const SongXS = ({ song, playTrack, editTrack, likeTrack, like }) => {
  const { title, thumbnail, genre, albums, url } = song;
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
            <button
              className=" bg-yellow-400 hover:bg-yellow-500 px-2 ml-1 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-500 text-white rounded-full transition ease-in duration-300"
              type="button"
              onClick={editTrack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>

            <button
<<<<<<< Updated upstream
              className={`${like ? 'text-black' : ''} bg-red-400 hover:bg-red-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-300 hover:border-red-500 text-white rounded-full transition ease-in duration-300`}
=======
              className={`${like ? 'bg-red-400' : 'bg-red-200'} hover:bg-red-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-300 hover:border-red-500 text-white rounded-full transition ease-in duration-300`}
>>>>>>> Stashed changes
              type="button"
              onClick={likeTrack}
            >
              <FaHeart />
            </button>
            <button
              className='bg-green-400 hover:bg-green-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300'
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
  like: null
};

SongXS.propTypes = {
  song: PropTypes.object,
  editTrack: PropTypes.func,
  playTrack: PropTypes.func,
  likeTrack: PropTypes.func,
  like: PropTypes.bool
};

export default SongXS;
