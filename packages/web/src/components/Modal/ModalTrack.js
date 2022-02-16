import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./modal.css";
import AddSong from "../../pages/AddSong";
import Card from "../elements/Card";

import { authSelector } from "../../redux/auth/auth-selectors";
import { trackSelector } from "../../redux/track/track-selectors";
import { setEditingTrack } from "../../redux/track/track-actions";

/**
 * Modal for edit songs
 * @returns JSX Modal styled with CSS
 */
function ModalTrack() {
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
        <AddSong isEditing trackEditing={track} />
      </Card>
    </div>
  );
}

export default ModalTrack;
