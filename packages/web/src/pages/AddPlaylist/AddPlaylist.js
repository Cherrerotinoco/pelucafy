import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/auth-selectors";
import api from "../../api";
import FileUploader from "../../components/FileUploader";
import * as auth from "../../services/auth";

import validateAddPlaylist from "../../utils/validation/validateAddPlaylist";
import { Elements } from "../../components/elements";
import { setEditingPlaylist } from "../../redux/playlist/playlist-actions";
import Card from "../../components/elements/Card";

/**
 * Page to add/edit playlist in the page or in the modal
 * @param {} param {isEditing {true to set modal visible}, playlistEditing={data playlist to edit}}
 * @returns JSX page styled with Tailwind
 */
const AddPlaylist = ({ isEditing, playlistEditing }) => {
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
    name: "",
    collaborative: false,
    description: "",
    coverThumbnail: "/images/logo.png",
    coverThumbnail_public_id: "",
    publicAccessible: true,
    numberSongs: 0,
    followedBy: [""],
    trackIds: [""],
  };

  const [playlist, setPlaylist] = useState(playlistEditing || initialState);
  const { name, description } = playlist;
  const [errorMessage, setErrorMesage] = useState({});

  const deletePlaylist = async (id) => {
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return;
    }
    try {
      await api.deletePlaylist(
        {
          Authorization: `Bearer ${token}`,
        },
        id,
      );

      dispatch(setEditingPlaylist({}));

      setPlaylist(initialState);
    } catch (error) {
      setErrorMesage(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateAddPlaylist(playlist);
    setErrorMesage(errors);

    if (Object.keys(errors).length > 0) {
      setRequest({
        ...request,
        isDataError: true,
      });
      return;
    }

    uploadPlaylist(playlist);

    setPlaylist(initialState);
  };

  const uploadPlaylist = async (playlistData) => {
    // Get token

    const token = await auth.getCurrentUserToken();
    if (!token) {
      return setRequest({ ...request, isDataError: "User not auth" });
    }

    setRequest({ ...request, isDataPending: true });

    try {
      const method = isEditing ? api.updatePlaylist : api.addNewPlaylist;
      const response = await method(
        {
          Authorization: `Bearer ${token}`,
        },
        playlistData,
      );

      if (response.data.error) throw Error(response.errorMessage);

      if (isEditing) return dispatch(setEditingPlaylist({}));

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
      setPlaylist({ ...playlist, [e.target.name]: e.target.value });
    },
    [playlist],
  );

  const updateThumbnailUrl = (error, result) => {
    if (!error && result && result.event === "success") {
      setPlaylist({
        ...playlist,
        coverThumbnail: result.info.secure_url,
        coverThumbnail_public_id: result.info.public_id,
      });
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <section className="addPlaylist fit m-auto">
        <Card>
          <Title weight="3" align="left">
            {isEditing ? "Edit Playlist" : "Create Playlist"}
          </Title>
          <form onSubmit={handleSubmit}>
            <>
              <div>
                <div className="w-full block items-center justify-between flex-grow lg:flex lg:items-center lg:w-auto ">
                  {isEditing && (
                    <img
                      src={playlist.coverThumbnail}
                      alt={playlist.name}
                      className="large-img"
                    />
                  )}
                  <Title weight="1" align="left">
                    {isEditing ? "" : "Step 1: Upload your Playlist cover"}
                  </Title>
                  <FileUploader callback={updateThumbnailUrl} text="Cover" />

                  {errorMessage.coverThumbnail && (
                    <ErrorMsg>{errorMessage.coverThumbnail}</ErrorMsg>
                  )}
                </div>
              </div>
            </>
            <>
              <Label htmlFor="name"> Title</Label>
              <Input
                name="name"
                value={name}
                placeholder="Step 2: Give your playlist a name"
                onChange={handleChange}
              />

              {errorMessage.name && <div>{errorMessage.name}</div>}

              <Label htmlFor="description"> Description</Label>
              <Input
                name="description"
                placeholder="Step 3: Give your playlist a description"
                value={description}
                onChange={handleChange}
              />

              {errorMessage.description && (
                <ErrorMsg>{errorMessage.description}</ErrorMsg>
              )}
              <div>
                <Button submit styles="light" disabled={request.isDataPending}>
                  {isEditing ? "Update" : "Create"}
                </Button>
                {isEditing && (
                  <Button
                    styles="light"
                    onClick={() => deletePlaylist(playlistEditing._id)}
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

AddPlaylist.defaultProps = {
  isEditing: false,
  playlistEditing: null,
};

AddPlaylist.propTypes = {
  isEditing: PropTypes.bool,
  playlistEditing: PropTypes.object,
};

export default AddPlaylist;
