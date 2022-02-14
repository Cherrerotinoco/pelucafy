import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import api from "../../api";
import * as auth from "../../services/auth";
import { authSelector } from "../../redux/auth/auth-selectors";

const Like = ({ likedBy, songId }) => {
  const { currentUser } = useSelector(authSelector);

  const [like, setLike] = useState(null);

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });

  // If current user ID its include in song.likedBy => setState(true)
  useEffect(() => {
    if (likedBy && likedBy.includes(currentUser._id)) setLike(true);
  }, [likedBy, currentUser]);

  const likeTrack = async (id) => {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    const method = like ? api.deleteLike : api.addLike;

    // ! opcion 1: pasarle a este componente el "song" completo

    try {
      const response = await method(
        {
          Authorization: `Bearer ${token}`,
        },
        {
          _id: id,
          userId: currentUser._id,
        },
      );

      if (response.data.error) throw Error(response.errorMessage);

      like ? setLike(false) : setLike(true);

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
          like
            ? "flex-no-shrink bg-red-500 hover:bg-white-500  px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-300 hover:border-white-500 text-red rounded-full transition ease-in duration-300"
            : "flex-no-shrink bg-red-300 hover:bg-white-500  px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-white-300 hover:border-white-500 text-red rounded-full transition ease-in duration-300"
        }
        type="button"
        onClick={() => likeTrack(songId)}
      >
        <FaHeart />
      </button>
    </>
  );
};

Like.defaultProps = {
  likedBy: [],
  songId: null,
};

Like.propTypes = {
  likedBy: PropTypes.array,
  songId: PropTypes.string,
};

export default Like;
