import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import {
  setCurrentTrack,
  setEditingTrack,
} from "../../redux/track/track-actions";

import SongXS from "./SongXS";
import SongS from "./SongS";
import SongM from "./SongM";
import SongL from "./SongL";

import api from "../../api";
import * as auth from "../../services/auth";

const Song = ({ song, size }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });
  const [like, setLike] = useState(null);

  const playTrack = () => {
    dispatch(setCurrentTrack(song));
  };

  const editTrack = () => {
    dispatch(setEditingTrack(song));
  };

  // If current user ID its include in song.likedBy => setState(true)
  useEffect(() => {
    if (song.likedBy.includes(currentUser._id)) setLike(true);
  }, [song, currentUser]);

  const likeTrack = async () => {
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    const method = like ? api.deleteLike : api.addLike;

    try {
      const response = await method(
        {
          Authorization: `Bearer ${token}`,
        },
        {
          _id: song._id,
          userId: currentUser._id,
        },
      );

      if (response.data.error) throw Error(response.errorMessage);

      like ? setLike(true) : setLike(false);

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
    <div className="song-component">
      {size === "XS" && (
        <SongXS
          song={song}
          playTrack={playTrack}
          editTrack={editTrack}
          likeTrack={likeTrack}
          like={like}
        />
      )}
      {size === "S" && <SongS song={song} playTrack={playTrack} />}
      {size === "M" && <SongM song={song} playTrack={playTrack} />}
      {size === "L" && <SongL song={song} playTrack={playTrack} />}
    </div>
  );
};

Song.defaultProps = {
  song: {},
  size: "S",
};

Song.propTypes = {
  song: PropTypes.object,
  size: PropTypes.string,
};

export default Song;
