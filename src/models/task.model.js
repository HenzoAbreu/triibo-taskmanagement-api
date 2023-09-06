const pool = require("../infra/database/conn");

const create = async (title, description, status, uuid, userID) => {
  const conn = await pool.getConnection();
  const query =
    "INSERT INTO tb_task (title, description, status, uuid, user_id) VALUES (?, ?, ?, ?, ?)";
  await conn.execute(query, [title, description, status, uuid, userID]);
};

const deleteTask = async (uuid, userID) => {
  const conn = await pool.getConnection();
  const query =
    "UPDATE tb_task SET deleted_at = NOW() WHERE uuid = ? and user_id = ?";
  await conn.execute(query, [uuid, userID]);
};

const getAll = async (userID) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT uuid, title, description, status FROM tb_task WHERE deleted_at IS NULL and user_id = ?";
  const [rows] = await conn.query(query, userID);
  return rows;
};

const getByUUID = async (uuid, userID) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT uuid, title, description, status FROM tb_task WHERE deleted_at IS NULL and uuid = ? AND user_id = ?";
  const [rows] = await conn.query(query, [uuid, userID]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

const getByStatus = async (status, userID) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT uuid, title, description, status FROM tb_task WHERE deleted_at IS NULL and status = ? and user_id = ?";
  const [rows] = await conn.query(query, [status, userID]);
  return rows;
};

const getByTitle = async (userID, title) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT uuid, title, description, status FROM tb_task WHERE deleted_at IS NULL and user_id = ? and title LIKE ?";
  const [rows] = await conn.query(query, [userID, `%${title}%`]);
  return rows;
};

const update = async (data) => {
  const conn = await pool.getConnection();
  const query =
    "UPDATE tb_task SET title = ?, description = ?, status = ? WHERE uuid = ?";
  await conn.execute(query, [
    data.title,
    data.description,
    data.taskStatus,
    data.taskID,
  ]);
};

module.exports = {
  create,
  getAll,
  getByStatus,
  getByUUID,
  getByTitle,
  deleteTask,
  update,
};
