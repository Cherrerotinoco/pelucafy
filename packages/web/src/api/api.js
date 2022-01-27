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
      body: body
    });
  }

  return {
    signUp: signUp,
    signOut: signOut,
    saveUserData: saveUserData,
  };
}

export default makeApi();
