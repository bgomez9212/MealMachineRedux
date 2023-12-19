require("dotenv").config();
const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/savedRecipes", controller.getSavedRecipes);

router.get("/ingredients", controller.getIngredients);
router.post("/ingredients", controller.postIngredients);
router.delete("/ingredients", controller.deleteIngredients);

router.get("/groceries", controller.getGroceries);
router.post("/groceries", controller.postGroceries);
router.delete("/groceries", controller.deleteGroceries);

module.exports = router;
