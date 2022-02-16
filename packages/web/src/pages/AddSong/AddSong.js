import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";
import FileUploader from "../../components/FileUploader";
import * as auth from "../../services/auth";

import validateAddSong from "../../utils/validation/validateAddSong";
import { Elements } from "../../components/elements";
import { setEditingTrack } from "../../redux/track/track-actions";
import Card from "../../components/elements/Card";

/**
 * Page to add/edit song in the page or in the modal
 * @param {} param {isEditing {true to set modal visible}, trackEditing={data song to edit}}
 * @returns JSX page styled with Tailwind
 */
const AddSong = ({ isEditing, trackEditing }) => {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  const { Button, Title, Label, Input, ErrorMsg } = Elements;

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });

  const initialState = {
    userId: currentUser._id,
    title: "",
    genre: "",
    url: "",
    thumbnail: "/images/logo.png",
    track_public_id: "",
    thumbnail_public_id: "",
  };

  const [song, setSong] = useState(trackEditing || initialState);
  const { title, genre } = song;

  const [errorMessage, setErrorMesage] = useState({});

  const deleteSong = async (id) => {
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return;
    }
    try {
      await api.deleteSong(
        {
          Authorization: `Bearer ${token}`,
        },
        id,
      );

      dispatch(setEditingTrack({}));

      setSong(initialState);
    } catch (error) {
      setErrorMesage(error.message);
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

    setSong(initialState);
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
        track_public_id: result.info.public_id,
      });
    }
  };

  const updateThumbnailUrl = (error, result) => {
    if (!error && result && result.event === "success") {
      setSong({
        ...song,
        thumbnail: result.info.secure_url,
        thumbnail_public_id: result.info.public_id,
      });
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <section className="addSong fit m-auto">
        <Card>
          <Title weight="3" align="left">
            {isEditing ? "Edit song" : "Add song"}
          </Title>
          <form onSubmit={handleSubmit}>
            <>
              {!isEditing && (
                <div className="items-center justify-between flex-grow lg:flex lg:items-center lg:w-auto ">
                  <Title weight="1" align="left">
                    Step 1: Upload your song
                  </Title>
                  {song.url ? (
                    <Button styles="light">Uploaded!!</Button>
                  ) : (
                    <FileUploader callback={updateSongUrl} text="Song" />
                  )}

                  {errorMessage.url && <ErrorMsg>{errorMessage.url}</ErrorMsg>}
                </div>
              )}

              <div className="w-full block items-center justify-between flex-grow lg:flex lg:items-center lg:w-auto ">
                {isEditing && (
                  <img
                    src={song.thumbnail}
                    alt={song.name}
                    className="large-img"
                  />
                )}

                <Title weight="1" align="left">
                  {isEditing ? "Image" : "Step 2: Upload your song cover"}
                </Title>
                <FileUploader callback={updateThumbnailUrl} text="Thumbnail" />

                {errorMessage.thumbnail && (
                  <ErrorMsg>{errorMessage.thumbnail}</ErrorMsg>
                )}
              </div>
            </>

            <>
              <Label htmlFor="title"> Title</Label>
              <Input
                name="title"
                placeholder="Step 3: Give your song a title"
                value={title}
                onChange={handleChange}
              />

              {errorMessage.title && <div>{errorMessage.title}</div>}

              <Label htmlFor="genre"> Genre</Label>
              <Input
                name="genre"
                value={genre}
                placeholder="Step 4: Give your song a genre"
                onChange={handleChange}
              />

              {errorMessage.genre && <ErrorMsg>{errorMessage.genre}</ErrorMsg>}
              <div>
                {song.url ? (
                  <>
                    <Button
                      styles="light"
                      submit
                      disabled={request.isDataPending}
                    >
                      {isEditing ? "Save" : "Upload"}
                    </Button>
                  </>
                ) : null}

                {isEditing && (
                  <Button
                    styles="light"
                    onClick={() => deleteSong(trackEditing._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </>
          </form>
        </Card>
      </section>
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
