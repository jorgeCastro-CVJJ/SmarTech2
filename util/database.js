const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "b7wuqmbbhwmvh5oziip7-mysql.services.clever-cloud.com",
  user: "usvm7wy65kkigu0d",
  database: "b7wuqmbbhwmvh5oziip7",
  password: "YhzxFvRqcIwZrqRFCoi3",
  port:3306
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