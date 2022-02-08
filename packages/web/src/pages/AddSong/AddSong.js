import React, { useCallback, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";
import FileUploader from "../../components/FileUploader";
import * as auth from "../../services/auth";

import validateAddSong from "./validateAddSong";
import { Elements } from "../../components/elements";

//

const AddSong = ({isEditing, trackEditing}) => {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  const { Button, Title, Label, Input, Card } = Elements;

  const [request, setRequest] = useState({
    isDataPending: false,
    isDataSuccess: false,
    isDataError: "",
  });
  const { isDataPending } = request;

  const [song, setSong] = useState( trackEditing || {
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
            {isEditing ? 'Edit song' : 'Upload Song'}
          </Title>
          <form onSubmit={handleSubmit}>
            {!isEditing && (!song.url || !song.thumbnail) ? (
              <>
                <div>
                  <Label>Step 1: Upload your song</Label>
                  <FileUploader callback={updateSongUrl} text="Song" />
                  {song.url && <div>{song.url}</div>}
                  {errorMessage.url && <div>{errorMessage.url}</div>}
                </div>

                <div>
                  <Label>Step 2: Upload your song cover</Label>
                  <FileUploader
                    callback={updateThumbnailUrl}
                    text="Thumbnail"
                  />
                  {song.thumbnail && <div>{song.thumbnail}</div>}

                  {errorMessage.thumbnail && (
                    <div>{errorMessage.thumbnail}</div>
                  )}
                </div>
              </>
            ) : null}

            {(song.url && song.thumbnail) || (isEditing && trackEditing) && (
              <>  
              hola
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
                  Upload
                </Button>
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
  trackEditing: null
}

AddSong.propTypes = {
  isEditing: PropTypes.bool,
  trackEditing: PropTypes.object
}

export default AddSong;
