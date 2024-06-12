const pool = require("./db.js");

async function getFoodId(foodName) {
  let foodId;
  const { rows: foodIdFromDb } = await pool.query(
    "SELECT id FROM food WHERE name = $1",
    [foodName.toLowerCase()]
  );
  foodId = foodIdFromDb;
  if (!foodId.length) {
    const addFoodQuery = "INSERT INTO food (name) VALUES ($1) returning id";
    const { rows: foodIdResult } = await pool.query(addFoodQuery, [
      foodName.toLowerCase(),
    ]);
    foodId = foodIdResult;
  }
  return foodId[0].id;
}

function createIngredientsList(ingredientsArr) {
  const ingredientsList = ingredientsArr
    .map(({ name }) => {
      return name.includes(" ") ? name.split(" ").join("+") : name;
    })
    .join(",+");
  return ingredientsList;
}

function createIngredientsListSearchedRecipes(ingredientsArr) {
  const ingredientsList = ingredientsArr
    .map(({ name }) => {
      return name.includes(" ") ? name.split(" ").join("") : name;
    })
    .join(",");
  return ingredientsList;
}

module.exports = {
  getFoodId,
  createIngredientsList,
  createIngredientsListSearchedRecipes,
};
