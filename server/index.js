const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8888;
const db = require("./db.js");
const router = require("./router.js");

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
