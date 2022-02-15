import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modal.css";
import AddPlaylist from "../../pages/AddPlaylist";
import Card from "../elements/Card";

import { authSelector } from "../../redux/auth/auth-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { setEditingPlaylist } from "../../redux/playlist/playlist-actions";

function ModalPlaylist() {
  const [hidden, setHidden] = useState(true);

  const { currentUser } = useSelector(authSelector);
  const { playlistEditing } = useSelector(playlistSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (playlistEditing) {
      setHidden(false); // Show
    }
  }, [playlistEditing]);

  if (Object.entries(playlistEditing).length <= 0) return null;

  const closeModal = () => {
    dispatch(setEditingPlaylist({}));
    setHidden(true); // Hide
  };

  const playlist = {
    userId: currentUser._id,
    name: playlistEditing.name,
    description: playlistEditing.description,
    trackIds: playlistEditing.trackIds,
    coverThumbnail: playlistEditing.coverThumbnail,
    _id: playlistEditing._id,
  };

  return (
    <div id="editing-modal" className="light" hidden={hidden}>
      <Card>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <AddPlaylist isEditing playlistEditing={playlist} />
      </Card>
    </div>
  );
}

export default ModalPlaylist;
