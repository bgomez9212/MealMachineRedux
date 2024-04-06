const model = require("./model.js");

module.exports = {
  getSavedRecipes: async (req, res) => {
    try {
      const result = await model.getSavedRecipes(req.query.user_id);
      res.send(result).status(200);
    } catch (err) {
      console.error("Error in getSavedRecipes:", err);
      res.status(500).send("Internal Server Error");
    }
  },
  postSavedRecipe: async (req, res) => {
    try {
      const { user_id, recipe_id, image, title } = req.body;
      await model.postSavedRecipe(user_id, recipe_id, image, title);
      res.sendStatus(201);
    } catch (err) {
      console.error("Error in postSavedRecipe", err);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteSavedRecipe: async (req, res) => {
    try {
      await model.deleteSavedRecipe(req.body.user_id, req.body.recipe_id);
      res.sendStatus(204);
    } catch (err) {
      console.error("Error in deleteSavedRecipe", err);
      res.status(500).send("Internal Server Error");
    }
  },
  getIngredients: async (req, res) => {
    try {
      const result = await model.getIngredients(req.query.user_id);
      res.send(result.rows).status(200);
    } catch (err) {
      console.error("Error in getIngredients", err);
      res.status(500).send("Internal Server Error");
    }
  },
  postIngredients: async (req, res) => {
    try {
      await model.postIngredients(req.body.user_id, req.body.food_name);
      res.sendStatus(201);
    } catch (err) {
      console.error("Error in postIngredients", err);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteIngredients: async (req, res) => {
    try {
      await model.deleteIngredients(req.body.ing_user_id);
      res.sendStatus(204);
    } catch (err) {
      console.error("Error in deleteIngredients", err);
      res.status(500).send("Internal Server Error");
    }
  },
  getGroceries: async (req, res) => {
    try {
      const result = await model.getGroceries(req.query.user_id);
      res.send(result.rows).status(200);
    } catch (err) {
      console.error("Error in getGroceries", err);
      res.status(500).send("Internal Server Error");
    }
  },
  postGroceries: async (req, res) => {
    try {
      await model.postGroceries(req.body.user_id, req.body.food_name);
      res.sendStatus(201);
    } catch (err) {
      console.error("Error in postGroceries", err);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteGroceries: async (req, res) => {
    try {
      await model.deleteGroceries(req.body.gro_user_id);
      res.sendStatus(204);
    } catch (err) {
      console.error("Error in deleteGroceries", err);
      res.status(500).send("Internal Server Error");
    }
  },
  getRecipes: async (req, res) => {
    try {
      const result = await model.getRecipes(req.query.user_id);
      res.send(result);
    } catch (err) {
      console.error("Error in getRecipes", err);
      res.status(500).send("Internal Server Error");
    }
  },
  getRecipeDetails: async (req, res) => {
    try {
      const result = await model.getRecipeDetails(req.query.recipe_id);
      res.send(result);
    } catch (err) {
      console.error("Error in getRecipeDetails", err);
      res.status(500).send("Internal Server Error");
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
