const { PlaylistRepo } = require("../repositories");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARI_API_CLOUD_NAME_DEV,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true,
});

async function deletePlaylist(req, res) {
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

async function uploadPlaylist(req, res) {
  console.log(req.body);
  //subirlo a mongo
  try {
    const response = await PlaylistRepo.create(req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getPlaylists(req, res) {
  // Static key names
  const arrayKeys = ["limit", "order", "skip"];
  const params = req.query;

  // Build an object to set in find() mongoose method
  let query = {};
  Object.entries(params).forEach(([key, value]) => {
    if (arrayKeys.includes(key)) return;
    query[key] = value;
  });

  // Send query to DB
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

async function addFollow(_id, userId) {
  //update en mongo
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

async function deleteFollow(_id, userId) {
  //update en mongo
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

async function updatePlaylist(req, res) {
  const { _id, ...rest } = req.body;

  //update en mongo
  try {
    const response = await PlaylistRepo.findAndUpdate({ _id: _id }, rest);
    res.send(response.data);
  } catch (error) {
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
