const { PlaylistRepo } = require("../repositories");

const getPlaylist = (req, res) => {
  try {
    console.log(req.user)
    // const response = await PlaylistRepo.findAll({userId: req.user.})
  } catch (error) {
    
  }
} 

module.exports = {
  getPlaylist: getPlaylist
};