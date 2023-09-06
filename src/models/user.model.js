const pool = require("../infra/database/conn");

const create = async (username, email, password, password_salt, uuid) => {
  const conn = await pool.getConnection();
  const query =
    "INSERT INTO tb_user (username, email, password, password_salt, uuid) VALUES (?, ?, ?, ?, ?)";
  await conn.execute(query, [username, email, password, password_salt, uuid]);
};

const deleteUser = async (userID) => {
  const conn = await pool.getConnection();
  const query = "UPDATE tb_user SET deleted_at = NOW() WHERE id = ?";
  await conn.execute(query, [userID]);
};

const getByEmail = async (email) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT id, username, email, password, password_salt, uuid FROM tb_user WHERE deleted_at IS NULL and email = ?";
  const [rows] = await conn.query(query, [email]);
  return rows;
};

const getByUUID = async (uuid) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT id, username, email, password, password_salt FROM tb_user WHERE deleted_at IS NULL and uuid = ?";
  const [rows] = await conn.query(query, [uuid]);
  return rows;
};

const getByUsername = async (username) => {
  const conn = await pool.getConnection();
  const query =
    "SELECT id, username, email, password, password_salt FROM tb_user WHERE deleted_at IS NULL and username = ?";
  const [rows] = await conn.query(query, [username]);
  return rows;
};

const updateEmail = async (userID, email) => {
  const conn = await pool.getConnection();
  const query = "UPDATE tb_user SET email = ? WHERE id = ?";
  await conn.execute(query, [email, userID]);
};

const updatePassword = async (data) => {
  const conn = await pool.getConnection();
  const query =
    "UPDATE tb_user SET password = ?, password_salt = ? WHERE email = ?";
  await conn.execute(query, [data[0], data[1], data[2]]);
};

const updateUsername = async (userID, username) => {
  const conn = await pool.getConnection();
  const query = "UPDATE tb_user SET username = ? WHERE id = ?";
  await conn.execute(query, [username, userID]);
};

module.exports = {
  create,
  deleteUser,
  getByEmail,
  getByUUID,
  getByUsername,
  updateEmail,
  updatePassword,
  updateUsername,
};
