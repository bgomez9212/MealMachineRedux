const model = require("./model.js");

module.exports = {
  getSavedRecipes: async (req, res) => {
    try {
      const result = await model.getSavedRecipes(req.query.user_id);
      res.send(result).status(200);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  postSavedRecipe: async (req, res) => {
    try {
      const { user_id, recipe_id, image, title } = req.body;
      await model.postSavedRecipe(user_id, recipe_id, image, title);
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteSavedRecipe: async (req, res) => {
    try {
      await model.deleteSavedRecipe(req.body.user_id, req.body.recipe_id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getIngredients: async (req, res) => {
    try {
      const result = await model.getIngredients(req.query.user_id);
      res.send(result.rows).status(200);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  postIngredients: async (req, res) => {
    try {
      await model.postIngredients(req.body.user_id, req.body.food_name);
      res.sendStatus(201);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  deleteIngredients: async (req, res) => {
    try {
      await model.deleteIngredients(req.body.ingredient_id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getGroceries: async (req, res) => {
    try {
      const result = await model.getGroceries(req.query.user_id);
      res.send(result.rows).status(200);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  postGroceries: async (req, res) => {
    try {
      await model.postGroceries(req.body.user_id, req.body.food_name);
      res.sendStatus(201);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  deleteGroceries: async (req, res) => {
    try {
      await model.deleteGroceries(req.body.grocery_id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getRecipes: async (req, res) => {
    try {
      const result = await model.getRecipes(req.query.user_id);
      res.send(result);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getRecipeDetails: async (req, res) => {
    try {
      const result = await model.getRecipeDetails(req.query.recipe_id);
      res.send(result);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  getSearchedRecipes: async (req, res) => {
    try {
      const result = await model.getSearchedRecipes(
        req.query.user_id,
        req.query.term
      );
      res.send(result);
    } catch {
      console.error("Error in getSearchedRecipes", err);
      res.status(500).send("Internal Server Error");
    }
  },
};
