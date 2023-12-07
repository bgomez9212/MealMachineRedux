const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = 8888;
const db = require("../db/index");

app.get("/", (req, res) => {
  db.query(`select * from food`, (err, result) => {
    if (err) {
      console.error("Error executing the query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
