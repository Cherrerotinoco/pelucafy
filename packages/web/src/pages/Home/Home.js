import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import { authSelector } from "../../redux/auth/auth-selectors";
import Song from "../../components/Song";
import { Elements } from "../../components/elements";

import { generateSongs } from "../../utils/DBTest";

// ! PARA COPIAR Y PEGAR;
// ! import { Elements } from "../../components/elements";
// ! const { Button, Title, Label, Input, ErrorMsg, Card } = Elements;

// ? const handleSetEmail = useCallback((e) => {
// ?    setEmail(e.target.value);
// ?  }, []);

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const { Button, Title, Label, Input, Card } = Elements;
  return (
    <>
      <Title weight="2">Recently Played</Title>

      <div className="flex flex-wrap">
        {generateSongs(2).map((song) => (
          <>
            <Song song={song} key={song._id.$oid} size="M" />
          </>
        ))}
        {generateSongs(6).map((song) => (
          <>
            <Song song={song} key={song._id.$oid} size="S" />
          </>
        ))}
      </div>

      <Title weight="2">Suggested</Title>
      <div className="flex flex-wrap">
        {generateSongs(4).map((song) => (
          <>
            <Song song={song} key={song._id.$oid} size="S" />
          </>
        ))}
      </div>
    </>
  );
}

export default Home;
