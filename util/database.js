const mysql = require("mysql2");

const ENV = "GABRIEL";

let password = '';
if (ENV == 'DENISSE') {
  password = 'root'
}


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reportes_st",
  password: password,
});

module.exports = pool.promise();
