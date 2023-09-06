const express = require("express");

const authController = require("../controllers/auth.controller");
const routes = express.Router();

routes.post("/signup", authController.signup);
routes.post("/signin", authController.signin);
routes.put("/change-password", authController.changePassword);


module.exports = routes;
