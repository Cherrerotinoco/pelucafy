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

module.exports = {
  uploadSong: uploadSong,
  getSongs: getSongs,
};
