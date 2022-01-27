const { auth } = require("../services");

async function emailChangeMiddelware(req, res, next) {
    
  const newEmail = req.body.email
  const uid = req.user.uid
  
  if (newEmail !== req.body.email) next()

  try {
    await auth.updateUser(uid, {email: newEmail})
    next()  
  } catch (error) {
    res.status(500).send({
      data: null,
      error: error.message,
    });
  }
} 

module.exports = {
  emailChangeMiddelware
}