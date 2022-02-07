import React from "react";
import { generateSongs } from "../../utils/DBTest";

// !
import { Elements } from "../../components/elements";
import Song from "../../components/Song";
// !

const NowPlaying = () => {
  const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;
  return (
    <>
      <div className="flex-no-shrink">
        {generateSongs(1).map((song) => (
          <>
            <Song song={song} key={song._id.$oid} size="L" />
          </>
        ))}
      </div>
    </>
  );
};

export default NowPlaying;
