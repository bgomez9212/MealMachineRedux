const { Pool } = require("pg");
const dotenv = require("dotenv").config();
const config = {
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  max: process.env.MAX, // max number of clients in the pool
  idleTimeoutMillis: process.env.IDLETIMEOUTMILLIS,
};

const pool = new Pool(config);
pool.on("error", function (err, client) {
  console.error("idle client error", err.message, err.stack);
});

module.exports = pool;
