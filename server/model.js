const dotenv = require("dotenv").config();
const axios = require("axios");
const pool = require("./db.js");
const currentDate = new Date().toLocaleDateString();
module.exports = {
  getSavedRecipes: async (user_id) => {
    if (!user_id) {
      throw new Error("User ID is required");
    }
    try {
      const query = `SELECT * FROM savedRecipes WHERE user_id = $1 ORDER BY date_added`;
      const { rows: result } = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  postSavedRecipe: async (user_id, recipe_id, image, title) => {
    if (!user_id || !recipe_id) {
      throw new Error("missing parameter in postSavedRecipe");
    }
    try {
      const query =
        "INSERT INTO savedRecipes(user_id, recipe_id, image, title) VALUES ($1, $2, $3, $4)";
      await pool.query(query, [user_id, recipe_id, image, title]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteSavedRecipe: async (user_id, recipe_id) => {
    if (!user_id || !recipe_id) {
      throw new Error("missing parameter in deleteSavedRecipe");
    }
    try {
      const query =
        "DELETE FROM savedRecipes WHERE user_id = $1 and recipe_id = $2";
      await pool.query(query, [user_id, recipe_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getIngredients: async (user_id) => {
    if (!user_id) {
      throw new Error("ingredients missing user_id");
    }
    try {
      const query =
        "SELECT * FROM food INNER JOIN ingredients ON food.id = ingredients.food_id WHERE ingredients.user_id = $1";
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  postIngredients: async (user_id, food_name) => {
    if (!user_id || !food_name) {
      throw new Error("missing parameter in post ingredients");
    }
    try {
      let foodId;
      const checkFoodQuery = "SELECT id FROM food WHERE name = $1";
      const { rows: foodIdResult } = await pool.query(checkFoodQuery, [
        food_name.toLowerCase(),
      ]);
      foodId = foodIdResult;
      if (!foodId.length) {
        const addFoodQuery = "INSERT INTO food (name) VALUES ($1) returning id";
        const { rows: foodIdResult } = await pool.query(addFoodQuery, [
          food_name.toLowerCase(),
        ]);
        foodId = foodIdResult;
      }
      await pool.query(
        "INSERT INTO ingredients (user_id, food_id, date_added) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [user_id, foodId[0].id, currentDate]
      );
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteIngredients: async (ingredient_id) => {
    if (!ingredient_id) {
      throw new Error("missing ingredient id in deletion");
    }
    try {
      const query = "DELETE FROM ingredients WHERE id = $1";
      await pool.query(query, [ingredient_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getGroceries: async (user_id) => {
    if (!user_id) {
      throw new Error("missing user id in groceries");
    }
    try {
      const query =
        "SELECT * FROM food INNER JOIN groceries ON food.id = groceries.food_id WHERE groceries.user_id = $1";
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  postGroceries: async (user_id, food_name) => {
    if (!user_id || !food_name) {
      throw new Error("missing param in post groceries");
    }
    try {
      let foodId;
      const checkFoodQuery = "SELECT id FROM food WHERE name = $1";
      const { rows: foodIdResult } = await pool.query(checkFoodQuery, [
        food_name.toLowerCase(),
      ]);
      foodId = foodIdResult;
      if (!foodId.length) {
        const addFoodQuery = "INSERT INTO food (name) VALUES ($1) returning id";
        const { rows: foodIdResult } = await pool.query(addFoodQuery, [
          food_name.toLowerCase(),
        ]);
        foodId = foodIdResult;
      }
      await pool.query(
        "INSERT INTO groceries (user_id, food_id, date_added) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
        [user_id, foodId[0].id, currentDate]
      );
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteGroceries: async (grocery_id) => {
    if (!grocery_id) {
      throw new Error("missing grocery id in delete groceries");
    }
    try {
      const query = "DELETE FROM groceries WHERE id = $1";
      await pool.query(query, [grocery_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getRecipes: async (user_id) => {
    if (!user_id) {
      throw new Error("user_id missing in get recipes");
    }

    try {
      const ingredients = await pool.query(
        "SELECT name FROM food INNER JOIN ingredients ON food.id = ingredients.food_id WHERE ingredients.user_id = $1",
        [user_id]
      );
      const ingredientsList = ingredients.rows
        .map(({ name }) => {
          return name.includes(" ") ? name.split(" ").join("+") : name;
        })
        .join(",+");
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&number=9&ranking=2`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      return result.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getRecipeDetails: async (recipe_id) => {
    if (!recipe_id) {
      throw new Error("get recipe details missing recipe id");
    }
    try {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe_id}/information`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      return result.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getSearchedRecipes: async (user_id, term) => {
    if (!user_id || !term) {
      throw new Error("parameters missing from search recipes");
    }
    try {
      const { rows: ingredients } = await pool.query(
        "SELECT name FROM food INNER JOIN ingredients ON food.id = ingredients.food_id WHERE ingredients.user_id = $1",
        [user_id]
      );
      const ingredientsList = ingredients
        .map(({ name }) => {
          return name.includes(" ") ? name.split(" ").join("") : name;
        })
        .join(",");
      const { data: result } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?titleMatch=${term}&number=9&fillIngredients=true&includeIngredients=${ingredientsList}&sort=min-missing-ingredients`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
