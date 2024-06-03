const request = require("supertest");
const app = require("./app");
const pool = require("./db"); // Adjust the path to your db module

// let client;

// beforeAll(async () => {
//   client = await pool.connect();
//   await client.query("BEGIN");
// });

// afterEach(async () => {
//   await client.query("ROLLBACK");
// });

afterAll(async () => {
  await pool.end();
});

describe("testing saved recipes route", () => {
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
      imageUrl: "testImage",
      title: "testTitle",
    });
    expect(res.status).toBe(201);
  });
});
