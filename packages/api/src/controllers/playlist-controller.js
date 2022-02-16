const { PlaylistRepo } = require("../repositories");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARI_API_CLOUD_NAME_DEV,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads playlist data to DB
 * @param {*} req {data}
 * @param {*} res {resonse, error}
 */
async function uploadPlaylist(req, res) {
  console.log(req.body);
  try {
    const response = await PlaylistRepo.create(req.body);
    console.log(response);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * construct mongoose query with the params and gets playlists from the DB
 * @param {*} req {query}
 * @param {*} res {response, error}
 */
async function getPlaylists(req, res) {
  //? Static key names
  const arrayKeys = ["limit", "order", "skip"];
  const params = req.query;

  //?  Build an object to set in find() mongoose method
  let query = {};
  Object.entries(params).forEach(([key, value]) => {
    if (arrayKeys.includes(key)) return;
    query[key] = value;
  });

  //? Send query to DB
  try {
    const { limit, order, skip } = req.query;
    const response = await PlaylistRepo.findAll({
      query: query || {},
      limit: parseInt(limit) || 10,
      toSkip: parseInt(skip) || 0,
      order: order || "createdAt",
    });

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * update a playlist from DB
 * @param {*} req { _id,upload data }
 * @param {*} res {response, error}
 */
async function updatePlaylist(req, res) {
  const { _id, ...rest } = req.body;

  try {
    const response = await PlaylistRepo.findAndUpdate({ _id: _id }, rest);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * calls the function that insert or delete the userId in the playlist followedBy Array
 * @param {*} req { _id, userId, like=bool }
 * @param {*} res {response, error}
 */
async function followUnfollow(req, res) {
  console.log(req.body);
  try {
    const { _id, userId, follow } = req.body;
    if (!_id || !userId) throw Error("Not found valid property");

    const response = follow
      ? await addFollow(_id, userId)
      : await deleteFollow(_id, userId);

    if (response.error && response.data === null) throw Error(response.error);

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 *  Insert the userId in the playlist followed by Array
 * @param {*} _id {songId}
 * @param {*} userId
 * @returns {response, error}
 */
async function addFollow(_id, userId) {
  try {
    if (!_id || !userId) throw Error("Not found valid property");

    const response = await PlaylistRepo.findAndUpdate(
      { _id: _id },
      { $push: { followedBy: userId } },
    );

    if (response.error && response.data === null) throw Error(response.error);

    return response.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * Delete the userId in the followed by Array
 * @param {*} _id {songId}
 * @param {*} userId
 * @returns {response, error}
 */
async function deleteFollow(_id, userId) {
  try {
    if (!_id || !userId) throw Error("Not found valid property");

    const response = await PlaylistRepo.findAndUpdate(
      { _id: _id },
      { $pull: { followedBy: { $in: userId } } },
    );

    if (response.error && response.data === null) throw Error(response.error);

    return response.data;
  } catch (error) {
    return error.message;
  }
}

/**
 *  Delete playlist from db and cloudinary files
 * @param {*} req {_id: req.params.id}
 * @param {*} res {response.data}
 */
async function deletePlaylist(req, res) {
  console.log(req.params.id);
  const playlistId = { _id: req.params.id };
  try {
    const response = await PlaylistRepo.findAndDelete(playlistId);

    await cloudinary.uploader.destroy(
      response.data.thumbnail_public_id,
      function (error, result) {
        console.log(result, error);
      },
    );

    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  uploadPlaylist: uploadPlaylist,
  getPlaylists: getPlaylists,
  updatePlaylist: updatePlaylist,
  deletePlaylist: deletePlaylist,
  followUnfollow: followUnfollow,
};
