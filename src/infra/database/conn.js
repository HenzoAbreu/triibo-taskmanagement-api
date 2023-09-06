const dbConfig = require("../../config/dbConfig");

var db = require('mysql2-promise')();

db.configure(dbConfig);

const getConnection = () => {
  return db
};

module.exports = {
  getConnection,
};
