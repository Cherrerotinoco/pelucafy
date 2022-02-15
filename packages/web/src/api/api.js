import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
    });
  }

  // ! auth

  function signOut(headers) {
    return request({
      url: "/sign-out",
      requestMethod: "POST",
      headers: headers,
    });
  }

  function saveUserData(headers, body) {
    return request({
      url: "/account",
      requestMethod: "PUT",
      headers: headers,
      body: body,
    });
  }

  // ! common
  function saveImage(body, url) {
    return request({
      url: url,
      requestMethod: "POST",
      body: body,
    });
  }

  // ! songs
  function addNewSong(headers, body) {
    return request({
      url: "/tracks",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function getTracks(headers, params) {
    const { query, ...rest } = params;

    function buildParam(param) {
      let url = "";

      if (!param && typeof param !== "object") return url;

      Object.entries(param).forEach(([key, value]) => {
        url += value ? `${key}=${value}&` : "";
      });

      return url;
    }

    const url = `/tracks?${buildParam(query)}${buildParam(rest)}`;

    return request({
      url: url,
      requestMethod: "GET",
      headers: headers,
      body: null,
    });
  }

  function updateSong(headers, body) {
    return request({
      url: "/tracks",
      requestMethod: "PUT",
      headers: headers,
      body: body,
    });
  }

  function addLike(headers, body) {
    return request({
      url: "/tracks/likes",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function deleteLike(headers, body) {
    return request({
      url: "/tracks/likes",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function deleteSong(headers, id) {
    return request({
      url: `/tracks/${id}`,
      requestMethod: "DELETE",
      headers: headers,
    });
  }

  // ! Playlist

  // function getPlaylists(headers) {
  //   return request({
  //     url: "/playlist",
  //     requestMethod: "GET",
  //     headers: headers,
  //     body: null,
  //   });
  // }

  function addNewPlaylist(headers, body) {
    return request({
      url: "/playlist",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function getPlaylists(headers, params) {
    const { query, ...rest } = params;

    function buildParam(param) {
      let url = "";

      if (!param && typeof param !== "object") return url;

      Object.entries(param).forEach(([key, value]) => {
        url += value ? `${key}=${value}&` : "";
      });

      return url;
    }

    const url = `/playlist?${buildParam(query)}${buildParam(rest)}`;

    return request({
      url: url,
      requestMethod: "GET",
      headers: headers,
      body: null,
    });
  }

  function searchTracks(headers, keyword) {
    return request({
      url: `/search?keyword=${keyword}`,
      requestMethod: "GET",
      headers: headers,
    });
  }

  function updatePlaylist(headers, body) {
    return request({
      url: "/playlist",
      requestMethod: "PUT",
      headers: headers,
      body: body,
    });
  }

  function follow(headers, body) {
    return request({
      url: "/playlist/follows",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function unfollow(headers, body) {
    return request({
      url: "/playlist/follows",
      requestMethod: "POST",
      headers: headers,
      body: body,
    });
  }

  function deletePlaylist(headers, id) {
    return request({
      url: `/playlist/${id}`,
      requestMethod: "DELETE",
      headers: headers,
    });
  }

  return {
    //! auth
    signUp: signUp,
    signOut: signOut,
    saveUserData: saveUserData,
    //! common
    saveImage: saveImage,
    searchTracks: searchTracks,
    //! songs
    addNewSong: addNewSong,
    getTracks: getTracks,
    updateSong: updateSong,
    addLike: addLike,
    deleteLike: deleteLike,
    deleteSong: deleteSong,
    //! playlists
    addNewPlaylist: addNewPlaylist,
    getPlaylists: getPlaylists,
    updatePlaylist: updatePlaylist,
    follow: follow,
    unfollow: unfollow,
    deletePlaylist: deletePlaylist,
  };
}

export default makeApi();
