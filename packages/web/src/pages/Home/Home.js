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

      {generateSongs(10).map((song) => (
        <>
          <Song song={song} key={song._id.$oid} size="XS" />
        </>
      ))}
      <div className="flex flex-wrap">
        {generateSongs(10).map((song) => (
          <>
            <Song song={song} key={song._id.$oid} size="S" />
          </>
        ))}
      </div>

      <Title weight="2">Suggested</Title>
      <div className="flex flex-wrap">
        {generateSongs(10).map((song) => (
          <>
            <Song song={song} key={song._id.$oid} size="M" />
          </>
        ))}
      </div>
    </>
  );
}

export default Home;
