import React, { useState } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";
import FileUploader from "../../components/FileUploader";
import * as auth from "../../services/auth";
import Header from "../../components/Header";

const AddSong = () => {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  const [request, setRequest] = useState({
    isDataRequesting: false,
    isDataSuccess: false,
    isDataError: false,
  });
  const { isDataRequesting, isDataSuccess, isDataError } = request;

  const [song, setSong] = useState({
    userId: currentUser._id,
    title: "",
    genre: "",
    url: "",
    thumbnail: "",
  });
  const { title, genre } = song;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSong(song);
    console.log(song);
  };

  const updateSong = async (songData) => {
    // Get token
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    try {
      const response = await api.addNewSong(
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
        isDataError: false,
      });
      // setSong({
      //   userId: currentUser._id,
      //   title: "",
      //   genre: "",
      //   url: "",
      //   thumbnail: "",
      // });

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
        url: result.info.secure_url,
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
      <Header />
      <main className="Login">
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Upload Song</h1>
          <form onSubmit={handleSubmit}>
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

            <FileUploader callback={updateSongUrl} text="Song" />

            <FileUploader callback={updateThumbnailUrl} text="Thumbnail" />

            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isDataRequesting}
            >
              Upload
            </button>
            {/* {isDataError && <div>{isDataError}</div>} */}
          </form>
        </section>
      </main>
    </>
  );
};

export default AddSong;
