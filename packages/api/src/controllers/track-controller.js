const { TrackRepo } = require("../repositories");

async function uploadSong(req, res) {
  //subirlo a mongo
  try {
    const response = await TrackRepo.create(req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getSongs(req, res) {
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

async function addLike(req, res) {
  console.log(req.body);
  //update en mongo
  try {
    const { _id, userId } = req.body;
    if (!_id || !userId) throw Error("Not found valid property");

    const response = await TrackRepo.findAndUpdate(
      { _id: _id },
      { $push: { likedBy: userId } },
    );

    if (response.error && response.data === null) throw Error(response.error);

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteLike(req, res) {
  //update en mongo
  try {
    const { _id, userId } = req.body;
    if (!_id || !userId) throw Error("Not found valid property");

    const response = await TrackRepo.findAndDelete(
      { _id: _id },
      { $pull: { likedBy: userId } },
    );

    if (response.error && response.data === null) throw Error(response.error);

    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateSong(req, res) {
  const { _id, ...rest } = req.body;

  //update en mongo
  try {
    const response = await TrackRepo.findAndUpdate({ _id: _id }, rest);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  uploadSong: uploadSong,
  getSongs: getSongs,
  updateSong: updateSong,
  addLike: addLike,
  deleteLike: deleteLike,
};
