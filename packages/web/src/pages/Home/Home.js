import React from "react";
import "./Home.scss";
import Song from "../../components/Song";
import { Elements } from "../../components/elements";
import Playlist from "../../components/Playlists";
import useTracks from "../../hooks/useTracks";
import usePlaylist from "../../hooks/usePlaylist/usePlaylist";
import PlaylistCard from "../../components/Playlists/PlaylistCard";

// ! PARA COPIAR Y PEGAR;
// ! import { Elements } from "../../components/elements";
// ! const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;

// ? const handleSetEmail = useCallback((e) => {
// ?    setEmail(e.target.value);
// ?  }, []);

function Home() {
  const { Title } = Elements;

  const { trackList: popularsTracks } = useTracks({
    order: "-likedBy",
  });

  const { playlist: suggestedPlaylist } = usePlaylist({
    order: "-followedBy",
  });

  return (
    <>
      <Title weight="2">Suggested Lists</Title>
      <div className="w-full block items-center justify-arround flex-grow lg:flex lg:items-center lg:w-auto ">
        {suggestedPlaylist &&
          suggestedPlaylist.map((list) => (
            <PlaylistCard key={list._id} playlist={list} />
          ))}
      </div>
      <Title weight="2">Popular Songs</Title>
      {popularsTracks &&
        popularsTracks.map((song) => (
          <Song song={song} key={song._id} size="S" />
        ))}

      {/*
      <Title weight="2">Suggested</Title>
      <div className="flex flex-wrap">
        {suggestedTracks && suggestedTracks.map((song) => (
          <>
            <Song song={song} key={song._id} size="M" />
          </>
        ))}
      </div>
      */}
    </>
  );
}

export default Home;
