const { Pool } = require("pg");
const dotenv = require("dotenv").config();
const config = {
  user: dotenv.USER,
  database: dotenv.DATABASE,
  password: dotenv.PASSWORD,
  host: dotenv.HOST,
  port: dotenv.PORT,
  max: dotenv.MAX, // max number of clients in the pool
  idleTimeoutMillis: dotenv.IDLETIMEOUTMILLIS,
};

const pool = new Pool(config);
// pool.on("error", function (err, client) {
//   console.error("idle client error", err.message, err.stack);
// });

module.exports = pool;
