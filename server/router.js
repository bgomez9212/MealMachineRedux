require("dotenv").config();
const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/savedRecipes", controller.getSavedRecipes);
router.post("/savedRecipes", controller.postSavedRecipe);
router.delete("/savedRecipes", controller.deleteSavedRecipe);

router.get("/ingredients", controller.getIngredients);
router.post("/ingredients", controller.postIngredients);
router.delete("/ingredients", controller.deleteIngredients);

router.get("/groceries", controller.getGroceries);
router.post("/groceries", controller.postGroceries);
router.delete("/groceries", controller.deleteGroceries);

// router.get("/recipes", controller.getRecipes);
router.get("/recipesDetails", controller.getRecipeDetails);
module.exports = router;
