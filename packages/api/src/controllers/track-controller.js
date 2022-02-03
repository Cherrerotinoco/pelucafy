const { TrackRepo } = require("../repositories");

async function uploadSong(req, res, next) {
  console.log(req.body);

  //subirlo a mongo
  try {
    const response = await TrackRepo.create(req.body);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  uploadSong: uploadSong,
};
