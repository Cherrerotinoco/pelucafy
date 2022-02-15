import React from "react";

import "./modal.css";
import ModalPlaylist from "./ModalPlaylist";
import ModalTrack from "./ModalTrack";

function Modal() {
  return (
    <>
      <ModalPlaylist />
      <ModalTrack />
    </>
  );
}

export default Modal;
