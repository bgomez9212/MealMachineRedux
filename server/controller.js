const model = require("./model.js");

module.exports = {
  getSavedRecipes: async (req, res) => {
    const result = await model.getSavedRecipes(req.query.user_id);
    res.send(result).status(200);
  },
  postSavedRecipe: async (req, res) => {
    const { user_id, recipe_id, image, title } = req.body;
    await model.postSavedRecipe(user_id, recipe_id, image, title);
    res.sendStatus(201);
  },
  deleteSavedRecipe: async (req, res) => {
    await model.deleteSavedRecipe(req.body.user_id, req.body.recipe_id);
    res.sendStatus(204);
  },
  getIngredients: async (req, res) => {
    const result = await model.getIngredients(req.query.user_id);
    res.send(result.rows).status(200);
  },
  postIngredients: async (req, res) => {
    await model.postIngredients(req.body.user_id, req.body.food_name);
    res.sendStatus(201);
  },
  deleteIngredients: async (req, res) => {
    await model.deleteIngredients(req.body.ing_user_id);
    res.sendStatus(204);
  },
  getGroceries: async (req, res) => {
    const result = await model.getGroceries(req.query.user_id);
    res.send(result.rows).status(200);
  },
  postGroceries: async (req, res) => {
    await model.postGroceries(req.body.user_id, req.body.food_name);
    res.sendStatus(201);
  },
  deleteGroceries: async (req, res) => {
    await model.deleteGroceries(req.body.gro_user_id);
    res.sendStatus(204);
  },
  getRecipes: async (req, res) => {
    const result = await model.getRecipes(req.query.user_id);
    res.send(result);
  },
  getRecipeDetails: async (req, res) => {
    const result = await model.getRecipeDetails(req.query.recipe_id);
    res.send(result);
  },
  getSearchedRecipes: async (req, res) => {
    const result = await model.getSearchedRecipes(
      req.query.user_id,
      req.query.term
    );
    res.send(result);
  },
};
