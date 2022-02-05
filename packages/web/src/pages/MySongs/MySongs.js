import React, { useState } from "react";
import Song from "../../components/Song";
// !
import { Elements } from "../../components/elements";
// !
import { generateSongs } from "../../utils/DBTest";

const MySongs = () => {
  const { Title } = Elements;
  return (
    <>
      <section className="MySongs">
        <Title weight="3">My songs</Title>
        <div className="flex flex-row">
          <div className="flex flex-col items-center min-h-screen">
            <div className="max-w-full w-full mx-auto z-10">
              <div className="flex flex-wrap">
                {generateSongs(6).map((song) => (
                  <>
                    <Song song={song} key={song._id.$oid} size="M" />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MySongs;
