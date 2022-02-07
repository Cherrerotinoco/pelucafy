import React, { useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import Song from "../../components/Song";
import useTracks from "../../hooks/useTracks";

const MySongs = () => {
  const { currentUser } = useSelector(authSelector);
  // traer currentUser

  const { trackList, error, page } = useTracks({
    query: { userId: currentUser._id },
    limit: 2,
    page: 2,
  });

  // state
  // tracklist

  return (
    <>
      <main className="Login">
        <section className="Login__wrapper flex flex-row">
          <article className="basis-1/2">
            <h3 className="text-center text-xl font-bold text-green-600">
              MY SONGS
            </h3>
            {error && <p>{error}</p>}
            <div className="flex flex-col items-center min-h-screen bg-center bg-cover">
              <div className="max-w-3xl w-full mx-auto z-10">
                <div className="flex flex-col">
                  {trackList &&
                    trackList.map((song) => (
                      <Song
                        key={song._id.$oid}
                        title={song.title}
                        thumbnail={song.thumbnail}
                      />
                    ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default MySongs;
