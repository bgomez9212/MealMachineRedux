const model = require("./model.js");

module.exports = {
  getFood: async (req, res) => {
    const results = await model.getFood();
    res.send(results.rows).status(200);
  },
  postRecipe: async (req, res) => {
    const { user_id, recipeId } = req.query;
    await model.postSavedRecipe(user_id, recipeId);
    res.sendStatus(201);
  },
  getSavedRecipes: async (req, res) => {
    const { user_id } = req.query;
    const result = await model.getSavedRecipes(user_id);
    res.send(results.rows).status(200);
  },
};
