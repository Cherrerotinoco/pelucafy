import React from "react";
import { FaPlay, FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";

const Song = ({ title, thumbnail }) => {
  console.log(title, thumbnail);
  return (
    <>
      <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
        <div className="flex-none sm:flex">
          <div className=" relative h-28 w-28   sm:mb-0 mb-3">
            <img
              src={thumbnail}
              alt={title}
              className=" w-28 h-28 object-cover rounded-2xl"
            />

            <a
              href="#"
              className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </a>
          </div>
          <div className="flex-auto sm:ml-5 justify-between">
            <div className="flex items-center justify-between sm:mt-2">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                    {title}
                  </div>
                  <div className="flex-auto text-gray-500 my-1">
                    <span className="mr-3 ">Genero</span>
                    <span className="mr-3 border-r border-gray-200  max-h-0" />
                    <span>Playlist</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-2  text-sm text-gray-500">
              <div className="flex-1 flex-col inline-flex items-center mx-2">
                <FaMusic />
                <p className="">2.5k</p>
              </div>
              <div className="flex-1 flex-col inline-flex items-center mx-2">
                <FaHeart />
                <p className="">14</p>
              </div>
              <button
                className="flex-no-shrink bg-red-400 hover:bg-white-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-white-300 hover:border-white-500 text-red rounded-full transition ease-in duration-300"
                type="button"
              >
                <FaHeart />
              </button>

              <button
                className="flex-no-shrink bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                type="button"
              >
                <FaPlay />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Song.defaultProps = {
  title: "title",
  thumbnail: "tumbnail",
};

Song.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default Song;