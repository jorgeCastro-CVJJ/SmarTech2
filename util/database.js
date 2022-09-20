const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reportes_st",
  password: "",
});

module.exports = pool.promise();
