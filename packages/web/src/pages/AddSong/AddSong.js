import React, { useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";
import FileUploader from "../../components/FileUploader";
import * as auth from "../../services/auth";

import validateAddSong from "./validateAddSong";

const AddSong = () => {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });
  const { isDataPending } = request;

  const [song, setSong] = useState({
    userId: currentUser._id,
    title: "",
    genre: "",
    url: "",
    thumbnail: "",
  });
  const { title, genre } = song;

  const [errorMessage, setErrorMesage] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateAddSong(song);
    setErrorMesage(errors);

    if (Object.keys(errors).length > 0) {
      setRequest({
        ...request,
        isDataError: true,
      });
      return;
    }

    updateSong(song);

    setSong({
      userId: currentUser._id,
      title: "",
      genre: "",
      url: "",
      thumbnail: "",
    });
  };

  const updateSong = async (songData) => {
    // Get token

    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    try {
      const response = api.addNewSong(
        {
          Authorization: `Bearer ${token}`,
        },
        songData,
      );

      if (response.data.error) throw Error(response.errorMessage);

      setRequest({
        ...request,
        isDataPending: false,
        isDataSuccess: true,
        isDataError: "",
      });

      return null;
    } catch (error) {
      setRequest({ ...request, isDataError: error.message });
      return null;
    }
  };

  function handleChange(e) {
    setSong({ ...song, [e.target.name]: e.target.value });
  }

  const updateSongUrl = (error, result) => {
    if (!error && result && result.event === "success") {
      setSong({
        ...song,
        duration: Math.ceil(result.info.duration),
        url: result.info.secure_url,
        createdAt: result.info.created_at,
      });
    }
  };

  const updateThumbnailUrl = (error, result) => {
    if (!error && result && result.event === "success") {
      setSong({
        ...song,
        thumbnail: result.info.secure_url,
      });
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <main className="Login">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Upload Song</h1>
          <form onSubmit={handleSubmit}>
            {!song.url || !song.thumbnail ? (
              <>
                <FileUploader callback={updateSongUrl} text="Song" />
                {errorMessage.url && <div>{errorMessage.url}</div>}

                <FileUploader callback={updateThumbnailUrl} text="Thumbnail" />
                {errorMessage.thumbnail && <div>{errorMessage.thumbnail}</div>}
              </>
            ) : null}

            {song.url && song.thumbnail && (
              <>
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={title}
                  onChange={handleChange}
                />
                {errorMessage.title && <div>{errorMessage.title}</div>}

                <label htmlFor="genre" className="form-label">
                  Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre"
                  className="form-input"
                  value={genre}
                  onChange={handleChange}
                />
                {errorMessage.genre && <div>{errorMessage.genre}</div>}
                <button
                  className="btn btn-primary w-full"
                  type="submit"
                  disabled={request.isDataPending}
                >
                  Upload
                </button>
              </>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default AddSong;
