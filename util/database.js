const mysql = require("mysql2");

//======================CLOUD SQL (HOST EN GOOGLE CLOUD PLATFORM)======================================================//
const pool = mysql.createPool({

  host: "34.71.226.216",
  user: "root",
  database: "eficiencia2_ST",
  password: "Denisse",
});
//=====================================================================================================================//
/*
const ENV = 'DENISSE';

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
*/
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

