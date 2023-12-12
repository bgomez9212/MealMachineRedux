const pool = require("../db/index.js");

module.exports = {
  getFood: async (user_id) => {
    const query = "SELECT * FROM food";
    const result = await pool.query(query);
    return result;
  },
  postSavedRecipe: async (user_id, recipeId) => {
    const query = "INSERT INTO savedRecipes VALUES ($1, $2)";
    const result = await pool.query(query, [user_id, recipeId]);
    return result;
  },
  getSavedRecipes: async (user_id) => {
    const query = "SELECT * FROM savedRecipes WHERE user_id = $1";
    const result = await pool.query(query, [user_id]);
    return result;
  },
};
