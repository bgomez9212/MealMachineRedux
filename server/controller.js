const model = require("./model.js");

module.exports = {
  getSavedRecipes: async (req, res) => {
    const result = await model.getSavedRecipes(req.query.user_id);
    res.send(result.rows).status(200);
  },
  getIngredients: async (req, res) => {
    const result = await model.getIngredients(req.query.user_id);
    res.send(result.rows).status(200);
  },
  postIngredients: async (req, res) => {
    const result = await model.postIngredients(
      req.query.user_id,
      req.query.food_name
    );
    res.sendStatus(201);
  },
  deleteIngredients: async (req, res) => {
    const result = await model.deleteIngredients(req.query.ing_user_id);
    res.sendStatus(204);
  },
  getGroceries: async (req, res) => {
    const result = await model.getGroceries(req.query.user_id);
    res.send(result.rows).status(200);
  },
  postGroceries: async (req, res) => {
    const result = await model.postGroceries(
      req.query.user_id,
      req.query.food_name
    );
    res.sendStatus(201);
  },
  deleteGroceries: async (req, res) => {
    const result = await model.deleteGroceries(req.query.gro_user_id);
    res.sendStatus(204);
  },
};
