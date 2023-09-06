const express = require("express");

const userController = require("../controllers/user.controller");
const routes = express.Router();

routes.put("/email", userController.updateEmail);

routes.put("/username", userController.updateUsername);

routes.delete("/", userController.userDelete);

module.exports = routes;
