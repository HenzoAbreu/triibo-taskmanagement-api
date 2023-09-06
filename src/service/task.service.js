const { v4: uuidv4 } = require("uuid");

const taskModel = require("../models/task.model");

const {
  NewInvalidStatusErr,
  NewTaskNotFoundErr,
  NewUnauthorizedErr,
} = require("../infra/errors/errors");

const create = async (loggedUser, userRequest) => {
  userRequest.title = userRequest.title.trim();

  userRequest.description = userRequest.description.trim();

  userRequest.status = userRequest.status.trim();

  const valuesToCheck = ["pending", "doing", "done"];

  if (!valuesToCheck.includes(userRequest.status)) {
    throw NewInvalidStatusErr();
  }

  const taskUUID = uuidv4();

  const data = await taskModel.create(
    userRequest.title,
    userRequest.description,
    userRequest.status,
    taskUUID,
    loggedUser.id
  );
  return data;
};

const getAll = async (userID) => {
  const data = await taskModel.getAll(userID);
  return data;
};

const getByStatus = async (userID, status) => {
  const valuesToCheck = ["pending", "doing", "done"];

  if (!valuesToCheck.includes(status)) {
    throw NewInvalidStatusErr();
  }

  const data = await taskModel.getByStatus(status, userID);
  return data;
};

const getByUUID = async (loggedUserID, taskUUID) => {
  const data = await taskModel.getByUUID(taskUUID, loggedUserID);
  if (!data || data.length == 0) {
    throw NewTaskNotFoundErr();
  }
  return data;
};

const getByTitle = async (userID, keyword) => {
  const tasks = await taskModel.getByTitle(userID, keyword);

  return tasks;
};

const taskDelete = async (loggedUserID, taskUUID) => {
  const task = await taskModel.getByUUID(taskUUID, loggedUserID);
  if (!task) {
    throw NewUnauthorizedErr();
  }
  return taskModel.deleteTask(taskUUID, loggedUserID);
};

const update = async (loggedUserID, userRequest) => {
  userRequest.newTitle = userRequest.newTitle.trim();

  userRequest.newDescription = userRequest.newDescription.trim();

  userRequest.newStatus = userRequest.newStatus.trim();

  //get task data
  const task = await taskModel.getByUUID(userRequest.uuid, loggedUserID);
  if (!task) {
    throw NewUnauthorizedErr();
  }

  if (userRequest.newTitle == "") {
    userRequest.newTitle = data.title;
  }
  if (userRequest.newDescription == "") {
    userRequest.newDescription = data.description;
  }
  if (userRequest.newStatus == "") {
    userRequest.newStatus = data.status;
  }

  //status check
  const valuesToCheck = ["pending", "doing", "done"];

  if (!valuesToCheck.includes(userRequest.newStatus)) {
    throw NewInvalidStatusErr();
  }

  const newData = await taskModel.update({
    title: userRequest.newTitle,
    description: userRequest.newDescription,
    taskStatus: userRequest.newStatus,
    taskID: task.uuid,
  });
  return newData;
};

module.exports = {
  create,
  getAll,
  getByStatus,
  getByUUID,
  getByTitle,
  taskDelete,
  update,
};
