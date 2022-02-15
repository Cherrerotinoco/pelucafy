const { SearchRepository } = require("../repositories");

async function getSongs(req, res) {
  const { keyword } = req.query;

  try {
    const tracks = await SearchRepository.findAll(keyword);
    const playlist = await SearchRepository.findAllPlaylist(keyword);
    const response = {
      tracks: tracks.data,
      playlist: playlist.data,
    };
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getSongs: getSongs,
};
