const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'postsdb',
  port: 3306,
  password: 'jbhkuh',
}).promise();

module.exports = pool;