const { TrackRepo } = require("../repositories");

async function uploadSong(req, res) {
  //subirlo a mongo
  try {
    const response = await TrackRepo.create(req.body);
    res.send(response.data)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function getSongs(req, res) {
    
  const {query, limit , order, skip} = req.body

  console.log(req.body)

    //subirlo a mongo
    try {
      const response = await TrackRepo.findAll({
        query: query || {},
        limit: limit || 1,
        toSkip: skip || 0,
        order: order || {createdAt: -1}
      });

      res.send(response.data)
    } catch (error) {
      res.status(500).send(error.message)
    }
}

module.exports = {
  uploadSong: uploadSong,
  getSongs: getSongs
};
