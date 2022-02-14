import React from "react";
import "./Home.scss";
import Song from "../../components/Song";
import { Elements } from "../../components/elements";

import useTracks from "../../hooks/useTracks";
import Search from "../../components/Search/Search";

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

  /*
  const { trackList: suggestedTracks } = useTracks({
    order: '-createdAt',
  });
  */

  return (
    <>
      <Search />
      <Title weight="2">Populars</Title>
      {popularsTracks &&
        popularsTracks.map((song) => (
          <Song song={song} key={song._id} size="XS" />
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
