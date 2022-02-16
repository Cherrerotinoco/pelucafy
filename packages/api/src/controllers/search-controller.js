const { SearchRepository } = require("../repositories");

/**
 * Search in the playlist and tracks DB
 * @param {*} req {query}
 * @param {*} res {response,data}
 */
async function searchAll(req, res) {
  const { keyword } = req.query;

  try {
    const tracks = await SearchRepository.findAll(keyword);
    const playlist = await SearchRepository.findAllPlaylist(keyword);
    const response = {
      tracks: tracks.data,
      playlist: playlist.data,
    };

    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  searchAll: searchAll,
};
