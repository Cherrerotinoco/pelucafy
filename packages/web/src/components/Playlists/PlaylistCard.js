import React from "react";
import { FaPlay, FaHeart, FaMusic } from "react-icons/fa";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Elements } from "../elements";
import Follow from "./Folow";
import EditPlaylist from "./EditPlaylist";
import { authSelector } from "../../redux/auth/auth-selectors";

const PlaylistCard = ({ playlist }) => {
  const { currentUser } = useSelector(authSelector);
  const { _id, name, coverThumbnail, description, followedBy, trackIds } =
    playlist;
  const { Card, Title, Label } = Elements;

  return (
    <>
      <Card>
        <div className="flex-none sm:flex">
          <div className=" relative h-28 w-28   sm:mb-0 mb-3">
            <img
              src={coverThumbnail}
              alt={name}
              className=" w-28 h-28 object-cover"
            />
            <button
              className="absolute -right-2 bottom-2   -ml-3 flex-no-shrink bg-green-400 hover:bg-green-500 px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
              type="button"
              onClick={console.log("musica maestro")}
            >
              <FaPlay />
            </button>
          </div>
          <div className="items-center justify-around sm:mt-2">
            <div className="flex items-center">
              <div className="flex-auto sm:ml-5 justify-between text-white">
                <div className="flex flex-col">
                  <div className="w-full flex-none text-lg text-white font-bold leading-none shadow">
                    {name}
                  </div>
                  <div className="flex-auto text-white my-1">
                    <span className="mr-3 ">{description}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex px-2 pt-2  text-xs text-white ">
              <div className="flex-1 flex-col inline-flex items-center mx-1 ">
                <FaMusic />
                <p className="">2.5k</p>
              </div>
              <div className="flex-1 flex-col inline-flex items-center mx-1">
                <FaHeart />
                <p className="">14</p>
              </div>
              <Follow followedBy={followedBy} playlistId={_id} />
              {playlist.userId === currentUser._id ? (
                <EditPlaylist playlist={playlist} />
              ) : null}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

PlaylistCard.defaultProps = {
  playlist: {},
};

PlaylistCard.propTypes = {
  playlist: PropTypes.object,
};

export default PlaylistCard;
