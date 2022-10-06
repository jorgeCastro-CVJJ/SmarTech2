const mysql = require("mysql2");

//======================CLOUD SQL (HOST EN GOOGLE CLOUD PLATFORM)======================================================//
// const pool = mysql.createPool({

//   host: "34.68.24.158",
//   user: "root",
//   database: "eficiencia2_ST",
//   password: "Denisse",
// });
//=====================================================================================================================//

const ENV = 'DENISSE';
//const ENV = 'PROD';

let host = '';
let password = '';


if (ENV == 'DENISSE') {
  password = 'root';
  host = 'localhost';
} else if (ENV == 'PROD') {
  password = 'Denisse';
  host = '34.68.24.158';
}

const pool = mysql.createPool({
  host: host,
  user: "root",
  database: "eficiencia2_ST",
  password: password,
});

//======================CLEVER CLOUD DATABASE CONECCTION===============================================================//
/*
const pool = mysql.createPool({
  host: "b7wuqmbbhwmvh5oziip7-mysql.services.clever-cloud.com",
  user: "usvm7wy65kkigu0d",
  database: "b7wuqmbbhwmvh5oziip7",
  password: "YhzxFvRqcIwZrqRFCoi3",
  port:3306
});
*/

module.exports = pool.promise();

