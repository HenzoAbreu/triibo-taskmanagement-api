const validator = require("validator");

const userModel = require("../models/user.model");

const {
  NewAlreadyRegisteredErr,
  NewInvalidFieldErr,
  NewInvalidUsernameErr,
} = require("../infra/errors/errors");

const updateEmail = async (loggedUserID, newEmail) => {
  const alreadyRegistered = await userModel.getByEmail(newEmail);

  if (alreadyRegistered.length > 0) {
    throw NewAlreadyRegisteredErr("email");
  }
  if (validator.isEmail(newEmail) == false) {
    throw NewInvalidFieldErr("email");
  }

  await userModel.updateEmail(loggedUserID, newEmail);
};

const updateUsername = async (loggedUserID, newUsername) => {
  //username checking
  newUsername = newUsername.trim();
  if (newUsername.length < 5 || newUsername.length > 20) {
    throw NewInvalidUsernameErr();
  }

  const alreadyRegisteredUsername = await userModel.getByUsername(newUsername);
  if (alreadyRegisteredUsername.length >= 1) {
    throw NewAlreadyRegisteredErr("username");
  }

  await userModel.updateUsername(loggedUserID, newUsername);
};

const userDelete = async (loggedUserID) => {
  await userModel.deleteUser(loggedUserID);
};

module.exports = {
  updateEmail,
  updateUsername,
  userDelete,
};
