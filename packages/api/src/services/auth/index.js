const { verifyAuthToken } = require("./verify-auth-token");
const { getAuthToken } = require("./get-auth-token");
const { login } = require("./login");
const { signOut } = require("./sign-out");
const { updateUser } = require("./auth-provider");

module.exports = {
  verifyAuthToken: verifyAuthToken,
  updateUser: updateUser,
  getAuthToken: getAuthToken,
  login: login,
  signOut: signOut,
};
