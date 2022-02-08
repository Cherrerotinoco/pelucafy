import React from "react";
import { FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";
import { Elements } from "../elements";

const SongL = ({ song }) => {
  console.log(song);
  const { title, thumbnail, genre, albums, url } = song;
  const { Card, Title, Label } = Elements;

  return (
    <>
      <div className="flex-none sm:flex justify-around mas-w-full">
        <div className="items-center flex-col">
          <Title weight="3" align="center">
            {title}
          </Title>
          <div className="sm:mb-0 mb-3">
            <img
              src={thumbnail}
              alt={title}
              className="w-25 object-cover large-img"
            />
          </div>
          <div className="flex items-center">
            <div className="flex-auto sm:ml-5 justify-between text-white">
              <div className="flex flex-col">
                <div className="flex-auto text-white my-1">
                  <Title weight="2">{genre}</Title>
                  {albums && albums.length !== 0 && (
                    <>
                      <span className="mr-3 border-r text-white  max-h-0" />
                      <Title weight="2">{albums}</Title>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-2 pt-2  text-sm text-white  ">
            <div className="flex-1 flex-col inline-flex items-center mx-1 ">
              <FaMusic />
              <p className="">2.5k</p>
            </div>
            <div className="flex-1 flex-col inline-flex items-center mx-1">
              <FaHeart />
              <p className="">14</p>
            </div>

            <div className="flex-1 flex-col inline-flex items-center mx-1">
              <button
                className="flex-no-shrink bg-red-400 hover:bg-white-500  px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-white-300 hover:border-white-500 text-red rounded-full transition ease-in duration-300"
                type="button"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SongL.defaultProps = {
  song: {
    _id: {
      $oid: `61fd4bffc9decf991a9e7b`,
    },
    albums: [],
    likedBy: [],
    userId: "TZAcGcsMp3SIxvzLnGNHMgUAtIn2",
    title: `Song`,
    genre: "Pop",
    url: "https://res.cloudinary.com/dfd26tpqi/video/upload/v1643887696/songprueba_lmhm4y.mp3",
    thumbnail:
      "https://res.cloudinary.com/dfd26tpqi/image/upload/v1643887701/thumbnailprueba_nmfgnf.png", // ! IURL-MAGE
    duration: {
      $numberInt: `155`,
    },
    createdAt: "2022-02-03T11:28:16Z",
    updatedAt: {
      $date: {
        $numberLong: "1643887696000",
      },
    },
    __v: {
      $numberInt: "0",
    },
  },
};

SongL.propTypes = {
  song: PropTypes.object,
};

export default SongL;
