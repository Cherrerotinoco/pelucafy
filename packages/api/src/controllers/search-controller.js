const { SearchRepository } = require("../repositories");

async function getSongs(req, res) {
  const { keyword } = req.query;

  try {
    const response = await SearchRepository.findAll(keyword);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getSongs: getSongs,
};
