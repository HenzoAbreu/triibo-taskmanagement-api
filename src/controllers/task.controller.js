const taskService = require("../service/task.service");

const create = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    await taskService.create(req.loggedUser, {
      title,
      description,
      status
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const data = await taskService.getAll(req.loggedUser.id);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};


const getByStatus = async (req, res, next) => {
  try {
    const status = req.params.status;
    const data = await taskService.getByStatus(req.loggedUser.id, status);
    res.status(200).send(data);
  } catch (error) {}
};


const getByUUID = async (req, res, next) => {
  try {
    const data = await taskService.getByUUID(req.loggedUser.id, req.params.id);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const getByKeyword = async (req, res, next) => {
  try {
    const title = req.query.title;
    if (!title) {
      throw new Error(`search type not implemented: ${JSON.stringify(req.query)}`);
    }
    const data = await taskService.getByTitle(req.loggedUser.id, title);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

const taskDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await taskService.taskDelete(req.loggedUser.id, id)
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const uuid = req.params.id;

    const { newTitle, newDescription, newStatus } = req.body;
    await taskService.update(req.loggedUser.id, {
      newTitle,
      newDescription,
      newStatus,
      uuid,
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getByStatus,
  getByUUID,
  getByKeyword,
  taskDelete,
  update,
};
