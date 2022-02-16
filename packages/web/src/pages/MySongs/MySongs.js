import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";

import Song from "../../components/Song";
import useTracks from "../../hooks/useTracks";
import Title from "../../components/elements/Title";
import ErrorMsg from "../../components/elements/ErrorMsg";

/**
 * My songs page shows all the songs uploaded by the user
 * @returns  JSX Page with components styled in Tailwind
 */
const MySongs = () => {
  const { currentUser } = useSelector(authSelector);

  const { trackList, error } = useTracks({
    query: { userId: currentUser._id },
  });

  return (
    <>
      <section className="MySongs w-full">
        <Title weight="3">My songs</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <div className="min-w-full">
          {trackList &&
            trackList.map((song) => (
              <Song key={song._id} song={song} size="S" />
            ))}
        </div>
      </section>
    </>
  );
};

export default MySongs;
