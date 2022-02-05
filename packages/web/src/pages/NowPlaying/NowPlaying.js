import React from "react";
import {
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

// !
import { Elements } from "../../components/elements";
// !

const NowPlaying = () => {
  const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;
  return (
    <>
      <div className="flex-no-shrink  m-3">
        <div className="w-auto justify-items-center p-3">
          <Title weight="2"> Song/Album/Playlist</Title>

          <div className="flex  mt-2">
            <div className="flex-auto w-1/2 ">
              <img
                src="/images/logo.png"
                className="light self-center"
                alt="logo"
              />
            </div>
            <div className="flex-auto w-1/2 ">
              <div className="p4">
                <div className="m-4">
                  <Label>Autor</Label>
                </div>
                <div className="m-4">
                  <Label>Album</Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  mt-2">
            <div className="flex-auto w-1/2 ">
              <Label>Titulo Cancion</Label>
            </div>
            <div className="flex-auto w-1/2 ">
              <Label>[likes] | [Plays]</Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NowPlaying;
