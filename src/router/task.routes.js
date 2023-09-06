const taskController = require("../controllers/task.controller");

const express = require("express");

const routers = express.Router();

//Get all tasks
routers.get("/", taskController.getAll);

//Search
routers.get("/search", taskController.getByKeyword);

//Get By Status
routers.get("/status/:status", taskController.getByStatus);

//Get by ID
routers.get("/:id", taskController.getByUUID);

//Update by ID
routers.put("/:id", taskController.update);

//Create new task
routers.post("/", taskController.create);

//Delete by ID
routers.delete("/:id", taskController.taskDelete);

module.exports = routers;
