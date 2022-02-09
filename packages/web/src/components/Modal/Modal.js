import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modal.css";
import AddSong from "../../pages/AddSong";
import Card from "../elements/Card";

import { authSelector } from "../../redux/auth/auth-selectors";
import { trackSelector } from "../../redux/track/track-selectors";
import { setEditingTrack } from "../../redux/track/track-actions";

function Modal() {
  const [hidden, setHidden] = useState(true);

  const { currentUser } = useSelector(authSelector);
  const { trackEditing } = useSelector(trackSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (trackEditing) {
      setHidden(false); // Show
    }
  }, [trackEditing]);

  if (Object.entries(trackEditing).length <= 0) return null;

  const closeModal = () => {
    dispatch(setEditingTrack({}));
    setHidden(true); // Hide
  };

  const track = {
    userId: currentUser._id,
    title: trackEditing.title,
    genre: trackEditing.genre,
    url: trackEditing.url,
    thumbnail: trackEditing.thumbnail,
    _id: trackEditing._id,
  };

  return (
    <div id="editing-modal" className="light" hidden={hidden}>
      <Card>
        <button type="button" onClick={closeModal}>
          X
        </button>
        <AddSong isEditing trackEditing={track} />
      </Card>
    </div>
  );
}

export default Modal;
