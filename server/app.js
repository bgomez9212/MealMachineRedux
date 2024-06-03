const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db.js");
const router = require("./router.js");

app.use(cors());
app.use(express.json());
app.use("/api", router);

module.exports = app;
