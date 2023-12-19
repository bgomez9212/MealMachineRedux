const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8888;
const db = require("../db/index");
const router = require("./router.js");

app.use(cors());
app.use("/api", router);
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
