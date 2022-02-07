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
      <section className="MySongs w-full">
        <Title weight="3">My songs</Title>
        <div className="min-w-full">
          {generateSongs(6).map((song) => (
            <>
              <Song song={song} key={song._id.$oid} size="XS" />
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default MySongs;
