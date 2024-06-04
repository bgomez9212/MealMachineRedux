const request = require("supertest");
const app = require("./app");
const pool = require("./db"); // Adjust the path to your db module

afterAll(async () => {
  await pool.end();
});

describe("test saved recipes route", () => {
  it("should return a 200 status code when a user_id is passed", async () => {
    const res = await request(app)
      .get("/api/savedRecipes")
      .query({ user_id: 12345 });
    expect(res.status).toBe(200);
  });

  it("should throw an error with 404 status code if a user_id is not passed", async () => {
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

  it("should not allow a recipe to be saved by a user if it is already saved", async () => {
    const res = await request(app).post("/api/savedRecipes").send({
      user_id: 12345,
      recipe_id: 54321,
      image: "testImage",
      title: "testTitle",
    });
    expect(res.status).toBe(500);
  });

  it("should throw an error if delete recipe is missing a parameter", async () => {
    const res = await request(app).delete("/api/savedRecipes").send({
      user_id: 12345,
    });
    expect(res.status).toBe(500);
  });

  it("should not allow a recipe to be saved by a user if it is already saved", async () => {
    const res = await request(app).delete("/api/savedRecipes").send({
      user_id: 12345,
      recipe_id: 54321,
    });
    expect(res.status).toBe(204);
  });
});

describe("test ingredients route", () => {
  it("should return status 200 when getting ingredients", async () => {
    const res = await request(app)
      .get("/api/ingredients")
      .query({ user_id: 12345 });
    expect(res.status).toBe(200);
  });

  it("should return an error when missing user_id in params", async () => {
    const res = await request(app).get("/api/ingredients");
    expect(res.status).toBe(404);
  });

  it("should return a 201 status when posting an ingredients", async () => {
    const res = await request(app)
      .post("/api/ingredients")
      .send({ user_id: 12345, food_name: "onions" });
    expect(res.status).toBe(201);
  });

  it("should return a 404 status when missing a parameter", async () => {
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

  it("should send an error when ingredient id is missing", async () => {
    const res = await request(app).delete("/api/ingredients");
    expect(res.status).toBe(404);
  });
});
