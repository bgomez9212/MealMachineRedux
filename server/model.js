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
      const client = await pool.connect();
      try {
        // Start a transaction
        await client.query("BEGIN");

        // Check if the food exists
        const checkFoodQuery = "SELECT id FROM food WHERE name = $1";
        const foodResult = await client.query(checkFoodQuery, [
          food_name.toLowerCase(),
        ]);

        let food_id;

        if (foodResult.rows.length === 0) {
          // If the food does not exist, insert it into the food table
          const insertFoodQuery =
            "INSERT INTO food (name) VALUES ($1) RETURNING id";
          const insertFoodResult = await client.query(insertFoodQuery, [
            food_name.toLowerCase(),
          ]);
          food_id = insertFoodResult.rows[0].id;
        } else {
          // If the food already exists, use its id
          food_id = foodResult.rows[0].id;
        }

        // Insert into the ingredients table, referencing the food table
        const insertIngredientQuery =
          "INSERT INTO ingredients (user_id, food_id, date_added) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING";
        await client.query(insertIngredientQuery, [
          user_id,
          food_id,
          currentDate,
        ]);

        // Commit the transaction
        await client.query("COMMIT");
      } catch (err) {
        // If any error occurs, rollback the transaction
        await client.query("ROLLBACK");
        throw err;
      } finally {
        // Release the client back to the pool
        client.release();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  // remove ingredient for user
  deleteIngredients: async (user_id, food_id) => {
    try {
      const query =
        "DELETE FROM ingredients WHERE user_id = $1 AND food_id = $2";
      await pool.query(query, [user_id, food_id]);
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
      const client = await pool.connect();
      try {
        // Start a transaction
        await client.query("BEGIN");

        // Check if the food exists
        const checkFoodQuery = "SELECT id FROM food WHERE name = $1";
        const foodResult = await client.query(checkFoodQuery, [food_name]);

        let food_id;

        if (foodResult.rows.length === 0) {
          // If the food does not exist, insert it into the food table
          const insertFoodQuery =
            "INSERT INTO food (name) VALUES ($1) RETURNING id";
          const insertFoodResult = await client.query(insertFoodQuery, [
            food_name,
          ]);
          food_id = insertFoodResult.rows[0].id;
        } else {
          // If the food already exists, use its id
          food_id = foodResult.rows[0].id;
        }

        // Insert into the groceries table, referencing the food table
        const insertGroceryQuery =
          "INSERT INTO groceries (user_id, food_id, date_added) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING";
        await client.query(insertGroceryQuery, [user_id, food_id, currentDate]);

        // Commit the transaction
        await client.query("COMMIT");
      } catch (err) {
        // If any error occurs, rollback the transaction
        await client.query("ROLLBACK");
        throw err;
      } finally {
        // Release the client back to the pool
        client.release();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteGroceries: async (user_id, food_id) => {
    try {
      const query = "DELETE FROM groceries WHERE user_id = $1 AND food_id = $2";
      await pool.query(query, [gro_user_id]);
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
          return name.includes(" ") ? name.split(" ").join("") : name;
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
        `https://api.spoonacular.com/recipes/complexSearch?titleMatch=pasta&number=9&fillIngredients=true&includeIngredients=bacon,egg,cheese,onion,chicken&sort=min-missing-ingredients`,
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
