import React, { useState, useEffect, useCallback } from "react";
import InputSearch from "../../components/InputSearch";
import api from "../../api";

import Song from "../../components/Song";
import Title from "../../components/elements/Title";
import PlaylistCard from "../../components/Playlists/PlaylistCard";
import ErrorMsg from "../../components/elements/ErrorMsg";

/**
 * Search Page rendered in the main content page, search playlist and songs by name
 * @returns JSX page with list of tailwind styled components
 */
const Search = () => {
  const [search, setSearch] = useState("");
  const [tracksFound, setTracksFound] = useState([]);
  const [playlistFound, setPlaylistFound] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchAll = useCallback(async () => {
    try {
      const response = await api.searchTracks(null, search);
      setTracksFound(response.data.tracks);
      setPlaylistFound(response.data.playlist);
    } catch (error) {
      setErrorMessage(error);
    }
  }, [search]);

  useEffect(() => {
    if (search.length > 0) {
      searchAll(search);
    } else {
      setTracksFound([]);
      setPlaylistFound([]);
    }
  }, [search, searchAll]);

  return (
    <>
      <InputSearch search={search} setSearch={setSearch} />

      {Object.entries(playlistFound).length > 0 && (
        <>
          <Title weight="2">Founded Playlist</Title>
          <div className="w-full block items-center justify-arround flex-grow lg:flex lg:items-center lg:w-auto ">
            {playlistFound.map((list) => (
              <PlaylistCard key={list._id} playlist={list} />
            ))}
          </div>
        </>
      )}

      {Object.entries(tracksFound).length > 0 && (
        <>
          <Title weight="2">Founded Songs</Title>
          {tracksFound.map((song) => (
            <Song song={song} key={song._id} size="S" />
          ))}
        </>
      )}
      {errorMessage ? <ErrorMsg>{errorMessage}</ErrorMsg> : null}
    </>
  );
};

export default Search;
