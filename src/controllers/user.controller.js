const userService = require("../service/user.service");

const updateUsername = async (req, res, next) => {
  try {
    const { newUsername } = req.body;

    await userService.updateUsername(req.loggedUser.id, newUsername);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const { newEmail } = req.body;

    await userService.updateEmail(req.loggedUser.id, newEmail);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const userDelete = async (req, res, next) => {
  try {
    await userService.userDelete(req.loggedUser.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateEmail,
  updateUsername,
  userDelete,
};
