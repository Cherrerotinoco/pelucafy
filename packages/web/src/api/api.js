import { makeRequest } from "./api-utils";

function makeApi(request = makeRequest()) {
  function signUp(headers) {
    return request({
      url: "/sign-up",
      requestMethod: "POST",
      headers: headers,
    });
  }

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

  function saveImage(body, url) {
    return request({
      url: url,
      requestMethod: "POST",
      body: body,
    });
  }

  function addNewSong(headers, body) {
    return request({
      url: "/tracks",
      requestMethod: "POST",
      headers: headers,
      body: body,
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

  function getTracks(headers, params) {
    const { query, ...rest } = params;

    function buildParam(param) {
      let url = "";

      if (!param && typeof param !== 'object') return url

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

  return {
    signUp: signUp,
    signOut: signOut,
    saveUserData: saveUserData,
    saveImage: saveImage,
    addNewSong: addNewSong,
    updateSong: updateSong,
    getTracks: getTracks,
  };
}

export default makeApi();
