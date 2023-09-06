const authService = require("../service/auth.service");

const {
  NewUnauthorizedErr,
  NewMissingFieldErr,
} = require("../infra/errors/errors");

const changePassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;

    await authService.changePassword({
      email,
      password,
      newPassword,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || (email || password) == "") {
      throw NewUnauthorizedErr();
    }

    const data = await authService.signin({
      email,
      password,
    });
    res.status(200).send({
      accessToken: data,
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username == "") {
      throw NewMissingFieldErr("username");
    }
    if (!email || email == "") {
      throw NewMissingFieldErr("email");
    }
    if (!password || password == "") {
      throw NewMissingFieldErr("password");
    }

    await authService.signup({
      username,
      email,
      password,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changePassword,
  signin,
  signup,
};
