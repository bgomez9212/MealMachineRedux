require("dotenv").config();
const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/food", controller.getFood);
router.get("/savedRecipes", controller.getSavedRecipes);
router.post("/savedRecipes", controller.postSavedRecipe);

module.exports = router;
