const pool = require("../db/index.js");
const currentDate = new Date().toLocaleDateString();
module.exports = {
  // get saved recipes for user
  getSavedRecipes: async (user_id) => {
    const query = `SELECT * FROM savedRecipes WHERE user_id = $1`;
    const result = await pool.query(query, [user_id]);
    return result;
  },
  postSavedRecipe: async (user_id, recipe_id) => {
    const query =
      "INSERT INTO savedRecipes(user_id, recipe_id) VALUES ($1, $2)";
    await pool.query(query, [user_id, recipe_id]);
  },
  deleteSavedRecipe: async (user_id, recipe_id) => {
    const query =
      "DELETE FROM savedRecipes WHERE user_id = $1 and recipe_id = $2";
    await pool.query(query, [user_id, recipe_id]);
  },
  // get ingredients for user
  getIngredients: async (user_id) => {
    const query =
      "SELECT * FROM food INNER JOIN ingredients ON food.id = ingredients.food_id WHERE ingredients.user_id = $1";
    const result = await pool.query(query, [user_id]);
    return result;
  },
  // add ingredient for user, also adding name to food table if name does not exist
  postIngredients: async (user_id, food_name) => {
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
        "INSERT INTO ingredients (user_id, food_id, ing_user_id, date_added) VALUES ($1, $2, $3, $4) ON CONFLICT (ing_user_id) DO NOTHING";
      await client.query(insertIngredientQuery, [
        user_id,
        food_id,
        food_id + user_id,
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
  },
  // remove ingredient for user
  deleteIngredients: async (ing_user_id) => {
    const query = "DELETE FROM ingredients WHERE ing_user_id = $1";
    await pool.query(query, [ing_user_id]);
  },
  // get groceries for user
  getGroceries: async (user_id) => {
    const query =
      "SELECT * FROM food INNER JOIN groceries ON food.id = groceries.food_id WHERE groceries.user_id = $1";
    const result = await pool.query(query, [user_id]);
    return result;
  },
  // add groceries for user
  postGroceries: async (user_id, food_name) => {
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
        "INSERT INTO groceries (user_id, food_id, gro_user_id, date_added) VALUES ($1, $2, $3, $4) ON CONFLICT (gro_user_id) DO NOTHING";
      await client.query(insertGroceryQuery, [
        user_id,
        food_id,
        food_id + user_id,
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
  },
  deleteGroceries: async (gro_user_id) => {
    const query = "DELETE FROM groceries WHERE gro_user_id = $1";
    await pool.query(query, [gro_user_id]);
  },
};
