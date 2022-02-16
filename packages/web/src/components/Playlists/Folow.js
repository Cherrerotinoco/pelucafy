import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import api from "../../api";
import * as auth from "../../services/auth";
import { authSelector } from "../../redux/auth/auth-selectors";

/**
 * Button to follow/ unfollow a playlist
 * @param {*} param {followedBy={[userId]} , playlistId={playlist._id}}
 * @returns JSX button styled with Tailwind
 */
const Follow = ({ followedBy, playlistId }) => {
  const { currentUser } = useSelector(authSelector);

  const [follow, setFollow] = useState(null);

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });

  // ? If current user ID its include in playlist.followedBy => setState(true)
  useEffect(() => {
    if (followedBy && followedBy.includes(currentUser._id)) setFollow(true);
  }, [followedBy, currentUser]);

  const followPlaylist = async () => {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    const method = follow ? api.unfollow : api.follow;

    try {
      const response = await method(
        {
          Authorization: `Bearer ${token}`,
        },
        {
          _id: playlistId,
          userId: currentUser._id,
          follow: !follow,
        },
      );

      if (response.data.error) throw Error(response.errorMessage);

      follow ? setFollow(false) : setFollow(true);

      return setRequest({
        ...request,
        isDataPending: false,
        isDataSuccess: true,
        isDataError: "",
      });
    } catch (error) {
      return setRequest({ ...request, isDataError: error.message });
    }
  };

  return (
    <>
      <button
        className={
          follow
            ? "flex-no-shrink bg-blue-500 hover:bg-white-500  px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-300 hover:border-white-500 text-blue rounded-full transition ease-in duration-300"
            : "flex-no-shrink bg-blue-300 hover:bg-white-500  px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-white-300 hover:border-white-500 text-blue rounded-full transition ease-in duration-300"
        }
        type="button"
        onClick={() => followPlaylist(playlistId)}
      >
        <FaStar />
      </button>
    </>
  );
};

Follow.defaultProps = {
  followedBy: [],
  playlistId: null,
};

Follow.propTypes = {
  followedBy: PropTypes.array,
  playlistId: PropTypes.string,
};

export default Follow;
