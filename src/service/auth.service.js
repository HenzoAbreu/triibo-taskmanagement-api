const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userModel = require("../models/user.model");

const {
  NewAlreadyRegisteredErr,
  NewInvalidFieldErr,
  NewInvalidCredentialErr,
  NewInvalidUsernameErr,
  NewInvalidPasswordErr,
} = require("../infra/errors/errors");

const changePassword = async (userRequest) => {
  const [data] = await userModel.getByEmail(userRequest.email);

  //email checking
  userRequest.email = userRequest.email.trim();

  if (!data || data.email != userRequest.email) {
    throw NewInvalidCredentialErr();
  }

  //password checking
  userRequest.password = userRequest.password.trim();

  const hashedPassword = await bcrypt.hashSync(
    userRequest.password,
    data.password_salt
  );

  if (data.password != hashedPassword) {
    throw NewInvalidCredentialErr();
  }

  //new password checking
  userRequest.newPassword = userRequest.newPassword.trim();
  if (userRequest.newPassword.length < 6) {
    throw NewInvalidPasswordErr();
  }

  const newPassword_salt = await bcrypt.genSaltSync(10);
  const newHashedPassword = await bcrypt.hashSync(
    userRequest.newPassword,
    newPassword_salt
  );

  await userModel.updatePassword([
    newHashedPassword,
    newPassword_salt,
    userRequest.email,
  ]);
};

const signin = async (userRequest) => {
  const [data] = await userModel.getByEmail(userRequest.email);

  //email checking
  userRequest.email = userRequest.email.trim();

  if (data.email != userRequest.email) {
    throw NewInvalidCredentialErr();
  }

  // jwt token generation

  const token = jwt.sign({ uuid: data.uuid }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  //password check and hash
  userRequest.password = userRequest.password.trim();

  const hashedPassword = await bcrypt.hashSync(
    userRequest.password,
    data.password_salt
  );

  if (data.password != hashedPassword) {
    throw NewInvalidCredentialErr();
  }

  return token;
};

const signup = async (userRequest) => {
  //Email checking
  userRequest.email = userRequest.email.trim();
  const alreadyRegisteredEmail = await userModel.getByEmail(userRequest.email);
  if (alreadyRegisteredEmail.length >= 1) {
    throw NewAlreadyRegisteredErr("email");
  }
  if (validator.isEmail(userRequest.email) == false) {
    throw NewInvalidFieldErr("email");
  }

  //Username checking
  userRequest.username = userRequest.username.trim();
  const alreadyRegisteredUsername = await userModel.getByUsername(
    userRequest.username
  );
  if (userRequest.username.length < 5 || userRequest.username.length > 20) {
    throw NewInvalidUsernameErr();
  }
  if (alreadyRegisteredUsername.length >= 1) {
    throw NewAlreadyRegisteredErr("username");
  }

  //Password checking
  userRequest.password = userRequest.password.trim();
  if (userRequest.password.length < 6) {
    throw NewInvalidPasswordErr();
  }

  // Hash the password
  const password_salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(
    userRequest.password,
    password_salt
  );

  //generate uuid
  const uuid = uuidv4();
  const data = await userModel.create(
    userRequest.username,
    userRequest.email,
    hashedPassword,
    password_salt,
    uuid
  );

  return data;
};

module.exports = {
  changePassword,
  signin,
  signup,
};
