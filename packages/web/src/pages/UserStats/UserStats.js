import React from "react";

// !
import { Elements } from "../../components/elements";
import Song from "../../components/Song";
import { generateSongs } from "../../utils/DBTest";
// !
const UserStats = () => {
  const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;

  return (
    <>
      <div>
        <Label>Your favourites </Label>
        <div className="flex flex-wrap">
          {generateSongs(2).map((song) => (
            <>
              <Song song={song} key={song._id.$oid} size="S" />
            </>
          ))}
        </div>

        <Label>Followed</Label>
        <div className="flex  ">
          <div className="flex-auto p-4 ">
            <img
              src="/images/logo.png"
              className="light rounded-full"
              alt="logo"
            />
          </div>
          <div className="flex-auto p-4 ">
            <img
              src="/images/logo.png"
              className="light rounded-full"
              alt="logo"
            />
          </div>
          <div className="flex-auto p-4 ">
            <img
              src="/images/logo.png"
              className="light rounded-full"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStats;
