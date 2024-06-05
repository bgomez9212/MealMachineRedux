const pool = require("./db");
const {
  createIngredientsList,
  createIngredientsListSearchedRecipes,
  getFoodId,
} = require("./utils.js");

describe("test createIngredientsList", () => {
  it("changes array to string", () => {
    const result = createIngredientsList([
      { name: "rice" },
      { name: "onion" },
      { name: "pepper flakes" },
    ]);
    expect(result).toBe("rice,+onion,+pepper+flakes");
  });
});

describe("test createIngredientsListSearchedRecipes", () => {
  it("changes array to string", () => {
    const result = createIngredientsListSearchedRecipes([
      { name: "rice" },
      { name: "onion" },
      { name: "pepper flakes" },
    ]);
    expect(result).toBe("rice,onion,pepperflakes");
  });

  describe("test insertIntoFoodTable", () => {
    it("returns food id when entered food is already in db", async () => {
      const res = await getFoodId("onions");
      expect(res).toBe(1);
    });
    it("inserts a food that doesn't exist and returns the correct food id", async () => {
      const res = await getFoodId("steak");
      const { rows: foodIdFromDb } = await pool.query(
        "select id from food where name = $1",
        ["steak"]
      );
      const remove = await pool.query("delete from food where id = $1", [res]);
      expect(res).toBe(foodIdFromDb[0].id);
      pool.end();
    });
  });
});
