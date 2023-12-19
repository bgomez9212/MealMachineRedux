const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = 8888;
const db = require("../db/index");
const router = require("./router.js");

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
