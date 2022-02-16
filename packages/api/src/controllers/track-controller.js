const { TrackRepo } = require("../repositories");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARI_API_CLOUD_NAME_DEV,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads track data to DB
 * @param {*} req {data}
 * @param {*} res {resonse, error}
 */
async function uploadSong(req, res) {
  //? upload to mongo
  try {
    const response = await TrackRepo.create(req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * construct mongoose query with the params and gets songs from the DB
 * @param {*} req {query}
 * @param {*} res {response, error}
 */
async function getSongs(req, res) {
  //? Static key names
  const arrayKeys = ["limit", "order", "skip"];
  const params = req.query;

  //? Build an object to set in find() mongoose method
  let query = {};
  Object.entries(params).forEach(([key, value]) => {
    if (arrayKeys.includes(key)) return;
    query[key] = value;
  });

  //? Send query to DB
  try {
    const { limit, order, skip } = req.query;
    const response = await TrackRepo.findAll({
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
 * update Song from DB
 * @param {*} req { _id,upload data }
 * @param {*} res {response, error}
 */
async function updateSong(req, res) {
  const { _id, ...rest } = req.body;

  try {
    const response = await TrackRepo.findAndUpdate({ _id: _id }, rest);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 * calls the function that insert or delete the userId in the songs likedBy Array
 * @param {*} req { _id, userId, like=bool }
 * @param {*} res {response, error}
 */
async function likeDislike(req, res) {
  console.log(req.body);
  try {
    const { _id, userId, like } = req.body;
    if (!_id || !userId) throw Error("Not found valid property");

    const response = like
      ? await addLike(_id, userId)
      : await deleteLike(_id, userId);

    if (response.error && response.data === null) throw Error(response.error);

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

/**
 *  Insert the userId in the songs likedBy Array
 * @param {*} _id {songId}
 * @param {*} userId
 * @returns {response, error}
 */
async function addLike(_id, userId) {
  try {
    if (!_id || !userId) throw Error("Not found valid property");

    const response = await TrackRepo.findAndUpdate(
      { _id: _id },
      { $push: { likedBy: userId } },
    );

    if (response.error && response.data === null) throw Error(response.error);

    return response.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * Delete the userId in the songs likedBy Array
 * @param {*} _id {songId}
 * @param {*} userId
 * @returns {response, error}
 */
async function deleteLike(_id, userId) {
  try {
    if (!_id || !userId) throw Error("Not found valid property");

    const response = await TrackRepo.findAndUpdate(
      { _id: _id },
      { $pull: { likedBy: { $in: userId } } },
    );

    if (response.error && response.data === null) throw Error(response.error);

    return response.data;
  } catch (error) {
    return error.message;
  }
}

/**
 *  Delete song from db and cloudinary files
 * @param {*} req {_id: req.params.id}
 * @param {*} res {response.data}
 */
async function deleteSong(req, res) {
  const songId = { _id: req.params.id };

  try {
    // ? delete track from DB
    const response = await TrackRepo.findAndDelete(songId);

    // ? delete track file from cloudinary
    await cloudinary.uploader.destroy(
      response.data.track_public_id,
      { resource_type: "video" },
      function (error, result) {
        res.send(result, error);
      },
    );
    // ? delete thumbnail file from cloudinary
    await cloudinary.uploader.destroy(
      response.data.thumbnail_public_id,
      function (error, result) {
        res.send(result, error);
      },
    );

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  uploadSong: uploadSong,
  getSongs: getSongs,
  updateSong: updateSong,
  deleteSong: deleteSong,
  likeDislike: likeDislike,
};
