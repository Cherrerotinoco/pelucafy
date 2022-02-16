import React from "react";
import { FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Elements } from "../elements";
import { authSelector } from "../../redux/auth/auth-selectors";
import Like from "./Like";
import Edit from "./Edit";
/**
 * Render songL card component used in NowPlaying component
 * @param {*} params  {song={song to print data}}
 * @returns JSX tailwind styled component
 */
const SongL = ({ song }) => {
  const { currentUser } = useSelector(authSelector);

  const { title, thumbnail, genre, albums, likedBy, _id } = song;
  const { Title } = Elements;

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
              {song.userId === currentUser._id ? <Edit song={song} /> : null}
            </div>
            <div className="flex-1 flex-col inline-flex items-center mx-1">
              <Like likedBy={likedBy} songId={_id} />
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
      $oid: "",
    },
    albums: [],
    likedBy: [],
    userId: "",
    title: `Cloudinary`,
    genre: "The most popular music App",
    url: "",
    thumbnail: "/images/logo.png",
    duration: {
      $numberInt: "",
    },
    createdAt: "2022-02-03T11:28:16Z",
    updatedAt: {
      $date: {
        $numberLong: "0000000000",
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
