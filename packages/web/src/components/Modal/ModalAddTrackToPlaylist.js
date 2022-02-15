import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modal.css";
import Card from "../elements/Card";

import { authSelector } from "../../redux/auth/auth-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { setTrackToAdd } from "../../redux/playlist/playlist-actions";
import AddTrackToPlayList from "../Forms/AddTrackToPlayList.js/AddTrackToPlayList";

const ModalAddTrackToPlaylist = () => {
  const [hidden, setHidden] = useState(true);

  const { currentUser } = useSelector(authSelector);
  const { trackToAdd } = useSelector(playlistSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trackToAdd) {
      setHidden(false); // Show
    }
  }, [trackToAdd]);

  if (Object.entries(trackToAdd).length <= 0) return null;

  const closeModal = () => {
    dispatch(setTrackToAdd(""));
    setHidden(true); // Hide
  };

  return (
    <div id="editing-modal" className="light" hidden={hidden}>
      <Card>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <AddTrackToPlayList trackToAdd={trackToAdd} />
      </Card>
    </div>
  );
};

export default ModalAddTrackToPlaylist;
