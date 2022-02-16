import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import PlaylistCard from "../../components/Playlists/PlaylistCard";
import usePlaylist from "../../hooks/usePlaylist/usePlaylist";
import Title from "../../components/elements/Title";
import ErrorMsg from "../../components/elements/ErrorMsg";

/**
 * My Playlists page shows all the playlist created by the user
 * @returns  JSX Page with components styled in Tailwind
 */
const MyPlaylists = () => {
  const { currentUser } = useSelector(authSelector);

  const { playlist, error } = usePlaylist({
    query: { userId: currentUser._id },
  });

  return (
    <>
      <section className="MyPlaylist w-full">
        <Title weight="3">My playlist</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <div className="w-full block items-center justify-arround flex-grow lg:flex lg:items-center lg:w-auto ">
          {playlist &&
            playlist.map((list) => (
              <PlaylistCard key={list._id} playlist={list} />
            ))}
        </div>
      </section>
    </>
  );
};

export default MyPlaylists;
