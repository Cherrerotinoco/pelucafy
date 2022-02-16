import React from "react";

import "./modal.css";
import ModalPlaylist from "./ModalPlaylist";
import ModalTrack from "./ModalTrack";

/**
 * Render other modal {ModalPlaylist, ModalTrack}, when needed
 * @returns JSX modal rendered
 */
function Modal() {
  return (
    <>
      <ModalPlaylist />
      <ModalTrack />
    </>
  );
}

export default Modal;
