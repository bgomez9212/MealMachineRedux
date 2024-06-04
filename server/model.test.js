const request = require("supertest");
const app = require("./app");
const pool = require("./db"); // Adjust the path to your db module

afterAll(async () => {
  await pool.end();
});

describe("test saved recipes route", () => {
  it("should throw an error with 404 status code if a user_id is not passed to get", async () => {
    const res = await request(app).get("/api/savedRecipes");
    expect(res.status).toBe(404);
  });

  it("should return a 201 status when a recipe is saved", async () => {
    const res = await request(app).post("/api/savedRecipes").send({
      user_id: 12345,
      recipe_id: 54321,
      image: "testImage",
      title: "testTitle",
    });
    expect(res.status).toBe(201);
  });

  it("should return a 200 status code, the user_id, title, image, and recipe_id when getting saved recipes", async () => {
    const res = await request(app)
      .get("/api/savedRecipes")
      .query({ user_id: 12345 });
    expect(res.status).toBe(200);
    expect(res.body[0].user_id).toBe("12345");
    expect(res.body[0].title).toBe("testTitle");
    expect(res.body[0].image).toBe("testImage");
    expect(res.body[0].recipe_id).toBe(54321);
  });

  it("should not allow a recipe to be saved by a user if it is already saved", async () => {
    const res = await request(app).post("/api/savedRecipes").send({
      user_id: 12345,
      recipe_id: 54321,
      image: "testImage",
      title: "testTitle",
    });
    expect(res.status).toBe(500);
  });

  it("should throw an error if delete saved recipe is missing a parameter", async () => {
    const res = await request(app).delete("/api/savedRecipes").send({
      user_id: 12345,
    });
    expect(res.status).toBe(500);
  });

  it("should allow a recipe to be deleted", async () => {
    const res = await request(app).delete("/api/savedRecipes").send({
      user_id: 12345,
      recipe_id: 54321,
    });
    expect(res.status).toBe(204);
  });
});

describe("test ingredients route", () => {
  it("should return an error when missing user_id in params for get", async () => {
    const res = await request(app).get("/api/ingredients");
    expect(res.status).toBe(404);
  });

  it("should return a 201 status when posting an ingredients", async () => {
    const res = await request(app)
      .post("/api/ingredients")
      .send({ user_id: 12345, food_name: "onions" });
    expect(res.status).toBe(201);
  });

  it("should return status 200, user_id, and food_id when getting ingredients", async () => {
    const { rows: foodId } = await pool.query(
      `SELECT id FROM food WHERE name = $1`,
      ["onions"]
    );
    const res = await request(app)
      .get("/api/ingredients")
      .query({ user_id: 12345 });
    expect(res.body[0].user_id).toBe("12345");
    expect(res.body[0].food_id).toBe(foodId[0].id);
    expect(res.status).toBe(200);
  });

  it("should return a 404 status when missing a parameter in a post", async () => {
    const res = await request(app)
      .post("/api/ingredients")
      .send({ food_name: "carrots" });
    expect(res.status).toBe(404);
  });

  it("should delete an ingredient", async () => {
    const { rows: ingredientId } = await pool.query(
      `SELECT id FROM ingredients WHERE user_id = $1 AND food_id = (SELECT id FROM food WHERE name = $2)`,
      ["12345", "onions"]
    );
    const res = await request(app)
      .delete("/api/ingredients")
      .send({ ingredient_id: ingredientId[0].id });
    expect(res.status).toBe(204);
  });

  it("should send an error when ingredient id is missing in delete", async () => {
    const res = await request(app).delete("/api/ingredients");
    expect(res.status).toBe(404);
  });
});

describe("test groceries route", () => {
  it("should return an error when missing user_id in params for get", async () => {
    const res = await request(app).get("/api/groceries");
    expect(res.status).toBe(404);
  });

  it("should return a 201 status when posting an groceries", async () => {
    const res = await request(app)
      .post("/api/groceries")
      .send({ user_id: 12345, food_name: "onions" });
    expect(res.status).toBe(201);
  });

  it("should return status 200 when getting groceries", async () => {
    const { rows: foodId } = await pool.query(
      `SELECT id FROM food WHERE name = $1`,
      ["onions"]
    );
    const res = await request(app)
      .get("/api/groceries")
      .query({ user_id: 12345 });
    expect(res.status).toBe(200);
    expect(res.body[0].user_id).toBe("12345");
    expect(res.body[0].food_id).toBe(foodId[0].id);
  });

  it("should return a 404 status when missing a parameter in post", async () => {
    const res = await request(app)
      .post("/api/groceries")
      .send({ food_name: "carrots" });
    expect(res.status).toBe(404);
  });

  it("should delete an ingredient", async () => {
    const { rows: groceryId } = await pool.query(
      `SELECT id FROM groceries WHERE user_id = $1 AND food_id = (SELECT id FROM food WHERE name = $2)`,
      ["12345", "onions"]
    );
    const res = await request(app)
      .delete("/api/groceries")
      .send({ grocery_id: groceryId[0].id });
    expect(res.status).toBe(204);
  });

  it("should send an error when ingredient id is missing in delete", async () => {
    const res = await request(app).delete("/api/groceries");
    expect(res.status).toBe(404);
  });
});

describe("test get recipes", () => {
  it("should return an error when a user_id is not passed to get", async () => {
    const res = await request(app).get("/api/recipes");
    expect(res.status).toBe(404);
  });

  it("should return an empty array and status code 200", async () => {
    const res = await request(app).get("/api/recipes").query({ user_id: 1 });
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });
});

describe("recipe details tests", () => {
  it("returns an error when there is no recipe id", async () => {
    const res = await request(app).get("/api/recipeDetails");
    expect(res.status).toBe(404);
  });

  it("returns a recipe object when an existing recipe id is passed", async () => {
    const res = await request(app)
      .get("/api/recipeDetails")
      .query({ recipe_id: 716429 });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(716429);
    expect(res.body.title).toBe(
      "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs"
    );
  });
});

describe("test search recipes", () => {
  it("returns an error if search is missing parameters", async () => {
    const res = await request(app).get("/api/searchRecipes");
    expect(res.status).toBe(404);
  });

  it("returns a list of recipes when passing correct parameters", async () => {
    const res = await request(app)
      .get("/api/searchRecipes")
      .query({ user_id: 12345, term: "pasta" });
    expect(res.status).toBe(200);
    expect(res.body.results.length).toBe(9);
  });
});
