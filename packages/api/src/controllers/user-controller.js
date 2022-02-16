const { UserRepo } = require("../repositories");

/**
 *  Validate and create user data in DB
 * @param {user} req
 * @param {*} res  { error,data}
 * @param {*} next
 * @returns  { newUser.data,  error,}
 */
async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    //? validate unique email
    const response = await UserRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }

    //? create user in the user DB
    const newUser = await UserRepo.create({
      _id: uid,
      email: email,
    });

    res.status(201).send({
      data: newUser.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * SingOut and delete user tokens
 * @param {signOut()} req {signOut()}
 * @param {*} res {{data, error}}
 */
async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
}

/**
 *  Update user data from DB
 * @param {*} req  {user.uid}
 * @param {*} res  {data,error}
 */
async function update(req, res) {
  try {
    await UserRepo.findAndUpdate({ _id: req.user.uid }, req.body);
    res.status(200).send({
      data: "OK",
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      error: error.message,
    });
  }
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
  update: update,
};
