const model = require("./model.js");
const { recipes } = require("./randomRecipes.json");

module.exports = {
  getSavedRecipes: async (req, res) => {
    const { rows } = await model.getSavedRecipes(req.query.user_id);
    // res.send(result.rows).status(200);
    const response = recipes.filter((recipe) => {
      return rows.some((f) => {
        return f.recipe_id === recipe.id;
      });
    });
    res.send(response).status(200);
  },
  postSavedRecipe: async (req, res) => {
    await model.postSavedRecipe(req.query.user_id, req.query.recipe_id);
    res.sendStatus(201);
  },
  deleteSavedRecipe: async (req, res) => {
    await model.deleteSavedRecipe(req.query.user_id, req.query.recipe_id);
    res.sendStatus(204);
  },
  getIngredients: async (req, res) => {
    const result = await model.getIngredients(req.query.user_id);
    res.send(result.rows).status(200);
  },
  postIngredients: async (req, res) => {
    await model.postIngredients(req.query.user_id, req.query.food_name);
    res.sendStatus(201);
  },
  deleteIngredients: async (req, res) => {
    await model.deleteIngredients(req.query.ing_user_id);
    res.sendStatus(204);
  },
  getGroceries: async (req, res) => {
    const result = await model.getGroceries(req.query.user_id);
    res.send(result.rows).status(200);
  },
  postGroceries: async (req, res) => {
    await model.postGroceries(req.query.user_id, req.query.food_name);
    res.sendStatus(201);
  },
  deleteGroceries: async (req, res) => {
    await model.deleteGroceries(req.query.gro_user_id);
    res.sendStatus(204);
  },
  getRecipes: async (req, res) => {
    const result = await model.getRecipes(req.query.user_id);
    res.send(result);
  },
};
