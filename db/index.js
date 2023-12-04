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
pool.on("error", function (err, client) {
  console.error("idle client error", err.message, err.stack);
});
pool.query("SELECT $1::int AS number", ["2"], function (err, res) {
  if (err) {
    return console.error("error running query", err);
  }
  console.log("number:", res.rows[0].number);
});
