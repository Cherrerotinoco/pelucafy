import React, { useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import Song from "../../components/Song";
import useTracks from "../../hooks/useTracks";
import Title from "../../components/elements/Title";

const MySongs = () => {
  const { currentUser } = useSelector(authSelector);
  // traer currentUser

  const { trackList, error, page } = useTracks({
    query: { userId: currentUser._id },
  });

  // state
  // tracklist

  return (
    <>
      <section className="MySongs w-full">
        <Title weight="3">My songs</Title>
        {error && <p>{error}</p>}
        <div className="min-w-full">
          {trackList &&
            trackList.map((song) => (
              <Song key={song._id} song={song} size="XS" />
            ))}
        </div>
      </section>
    </>
  );
};

export default MySongs;
