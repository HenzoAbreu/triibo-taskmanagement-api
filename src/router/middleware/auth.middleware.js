const jwt = require("jsonwebtoken");
const { NewInvalidTokenErr, NewMissingTokenErr } = require("../../infra/errors/errors");
const userModel = require("../../models/user.model");

const jwtMiddleware = async function (req, res, next) {
  const authToken = req.header("Authorization");
  if (authToken == null) {
    let err = NewMissingTokenErr();
    return res.status(err.status).json(err.customData);
  }
  const splittedToken = authToken.split(" ");
  if (splittedToken[0] !== "Bearer") {
    let err = NewInvalidTokenErr();
    return res.status(err.status).json(err.customData);
  }

  const token = splittedToken[1];

  if (token == null) {
    let err = NewMissingTokenErr();
    return res.status(err.status).json(err.customData);
  }

  const verified = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        let err = NewInvalidTokenErr();
        return res.status(err.status).json(err.customData);
      }
      const loggedUser = await userModel.getByUUID(user.uuid);
      if (loggedUser == null || loggedUser.length == 0) {
        let err = NewInvalidTokenErr();
        return res.status(err.status).json(err.customData);
      }
      req.loggedUser = loggedUser[0];
    
      next();
    }
  );
};

module.exports = jwtMiddleware;
