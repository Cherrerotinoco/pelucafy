import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";
import FileUploader from "../../components/FileUploader";
import * as auth from "../../services/auth";

import validateAddSong from "./validateAddSong";
import { Elements } from "../../components/elements";
import { setEditingTrack } from "../../redux/track/track-actions";

//

const AddSong = ({ isEditing, trackEditing }) => {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const { Button, Title, Label, Input } = Elements;

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });

  const [song, setSong] = useState(
    trackEditing || {
      userId: currentUser._id,
      title: "",
      genre: "",
      url: "",
      thumbnail: "",
    },
  );
  const { title, genre } = song;

  const [errorMessage, setErrorMesage] = useState({});

  const deleteSong = async (id) => {
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return;
    }
    try {
      const deleted = await api.deleteSong(
        {
          Authorization: `Bearer ${token}`,
        },
        id,
      );

      dispatch(setEditingTrack({}));

      setSong({
        userId: currentUser._id,
        title: "",
        genre: "",
        url: "",
        thumbnail: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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

    uploadSong(song);

    setSong({
      userId: currentUser._id,
      title: "",
      genre: "",
      url: "",
      thumbnail: "",
    });
  };

  const uploadSong = async (songData) => {
    // Get token

    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    try {
      const method = isEditing ? api.updateSong : api.addNewSong;

      const response = await method(
        {
          Authorization: `Bearer ${token}`,
        },
        songData,
      );

      if (response.data.error) throw Error(response.errorMessage);

      if (isEditing) return dispatch(setEditingTrack({}));

      return setRequest({
        ...request,
        isDataPending: false,
        isDataSuccess: true,
        isDataError: "",
      });
    } catch (error) {
      return setRequest({ ...request, isDataError: error.message });
    }
  };

  const handleChange = useCallback(
    (e) => {
      setSong({ ...song, [e.target.name]: e.target.value });
    },
    [song],
  );

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
          <Title weight="3" align="left">
            {isEditing ? "Edit song" : "Upload Song"}
          </Title>
          <form onSubmit={handleSubmit}>
            {!isEditing && (
              <div>
                <Label>Step 1: Upload your song</Label>
                <FileUploader callback={updateSongUrl} text="Song" />
                {song.url && <div>{song.url}</div>}
                {errorMessage.url && <div>{errorMessage.url}</div>}
              </div>
            )}

            <div>
              {isEditing && (
                <img
                  src={song.thumbnail}
                  alt={song.name}
                  className="large-img"
                />
              )}

              <Label>
                {isEditing ? "Image" : "Step 2: Upload your song cover"}
              </Label>
              <FileUploader callback={updateThumbnailUrl} text="Thumbnail" />

              {errorMessage.thumbnail && <div>{errorMessage.thumbnail}</div>}
            </div>

            {song.url && song.thumbnail && (
              <>
                <Label htmlFor="title"> Title</Label>
                <Input name="title" value={title} onChange={handleChange} />

                {errorMessage.title && <div>{errorMessage.title}</div>}

                <Label htmlFor="genre"> Genre</Label>
                <Input name="genre" value={genre} onChange={handleChange} />

                {errorMessage.genre && <div>{errorMessage.genre}</div>}

                <Button
                  submit
                  styles="noBackgroundHover"
                  disabled={request.isDataPending}
                >
                  {isEditing ? "Save" : "Upload"}
                </Button>
                {isEditing && (
                  <Button onClick={() => deleteSong(trackEditing._id)}>
                    Delete
                  </Button>
                )}
              </>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

AddSong.defaultProps = {
  isEditing: false,
  trackEditing: null,
};

AddSong.propTypes = {
  isEditing: PropTypes.bool,
  trackEditing: PropTypes.object,
};

export default AddSong;
