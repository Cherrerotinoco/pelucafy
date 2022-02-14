import React, { useState, useEffect } from "react";
import InputSearch from "../../components/InputSearch";
import api from "../../api";

import Song from "../../components/Song";

const Search = () => {
  const [search, setSearch] = useState("");
  const [tracksFound, setTracksFound] = useState([]);

  useEffect(() => {
    if (search.length > 0) {
      searchTracks(search);
    } else {
      setTracksFound([]);
    }
  }, [search]);

  const searchTracks = async () => {
    try {
      const response = await api.searchTracks(null, search);
      console.log(response);
      setTracksFound(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InputSearch search={search} setSearch={setSearch} />
      {tracksFound &&
        tracksFound.map((song) => (
          <Song song={song} key={song._id} size="XS" />
        ))}
    </>
  );
};

export default Search;
