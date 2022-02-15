import React from "react";

import "./modal.css";
import ModalPlaylist from "./ModalPlaylist";
import ModalTrack from "./ModalTrack";
import ModalAddTrackToPlaylist from "./ModalAddTrackToPlaylist";

function Modal() {
  return (
    <>
      <ModalPlaylist />
      <ModalTrack />
      <ModalAddTrackToPlaylist />
    </>
  );
}

export default Modal;
