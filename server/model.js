const dotenv = require("dotenv").config();
const axios = require("axios");
const pool = require("./db.js");
const currentDate = new Date().toLocaleDateString();
module.exports = {
  // get saved recipes for user
  getSavedRecipes: async (user_id) => {
    try {
      const query = `SELECT * FROM savedRecipes WHERE user_id = $1 ORDER BY date_added`;
      const { rows: result } = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  postSavedRecipe: async (user_id, recipe_id, imageUrl, title) => {
    try {
      const query =
        "INSERT INTO savedRecipes(user_id, recipe_id, image, title) VALUES ($1, $2, $3, $4)";
      await pool.query(query, [user_id, recipe_id, imageUrl, title]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteSavedRecipe: async (user_id, recipe_id) => {
    try {
      const query =
        "DELETE FROM savedRecipes WHERE user_id = $1 and recipe_id = $2";
      await pool.query(query, [user_id, recipe_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  // get ingredients for user
  getIngredients: async (user_id) => {
    try {
      const query =
        "SELECT * FROM food INNER JOIN ingredients ON food.id = ingredients.food_id WHERE ingredients.user_id = $1";
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  // add ingredient for user, also adding name to food table if name does not exist
  postIngredients: async (user_id, food_name) => {
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
  // remove ingredient for user
  deleteIngredients: async (ingredient_id) => {
    try {
      const query = "DELETE FROM ingredients WHERE id = $1";
      await pool.query(query, [ingredient_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  // get groceries for user
  getGroceries: async (user_id) => {
    try {
      const query =
        "SELECT * FROM food INNER JOIN groceries ON food.id = groceries.food_id WHERE groceries.user_id = $1";
      const result = await pool.query(query, [user_id]);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  // add groceries for user
  postGroceries: async (user_id, food_name) => {
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
    try {
      const query = "DELETE FROM groceries WHERE id = $1";
      await pool.query(query, [grocery_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getRecipes: async (user_id) => {
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
      console.log(result.data[0].missedIngredients);
      return result.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  getRecipeDetails: async (recipe_id) => {
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
