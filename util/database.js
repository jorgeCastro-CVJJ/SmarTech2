const mysql = require("mysql2");

const ENV = 'FER';

let password = '';
if (ENV == 'DENISSE') {
  password = 'root'
}


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "eficiencia2_ST",
  password: password,
});

module.exports = pool.promise();
/*
const mysql = require("mysql2");


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reportes_ST",
  password: "root",
});

module.exports = pool.promise();*/