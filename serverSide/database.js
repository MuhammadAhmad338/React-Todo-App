const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  host: process.env.HOST,
  database: 'todoapp',
  
});

module.exports  = pool;