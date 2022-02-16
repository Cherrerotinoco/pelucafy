import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modal.css";
import AddPlaylist from "../../pages/AddPlaylist";
import Card from "../elements/Card";

import { authSelector } from "../../redux/auth/auth-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { setEditingPlaylist } from "../../redux/playlist/playlist-actions";

/**
 * Modal for edit playlist
 * @returns JSX Modal styled with CSS
 */
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
    <div id="editing-modal" className="light editing-modal" hidden={hidden}>
      <Card>
        <button
          type="button"
          className=" w-10 text-white fixed
           bg-red-300 hover:bg-red-500 rounded place-self-end px-2 ml-2 py-2 text-xs shadow-sm hover:shadow-lg font-medium tracking-wider border-white hover:border-white transition ease-in duration-300"
          onClick={closeModal}
        >
          X
        </button>
        <AddPlaylist isEditing playlistEditing={playlist} />
      </Card>
    </div>
  );
}

export default ModalPlaylist;
