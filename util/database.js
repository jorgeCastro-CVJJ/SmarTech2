const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reportes_ST",
  password: "root",
});

module.exports = pool.promise();
