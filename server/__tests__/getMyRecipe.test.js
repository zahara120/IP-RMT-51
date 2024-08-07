const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Recipe } = require("../models");
const { generateToken } = require("../helpers/jwt");

let userId = "";
let token = "";

const registeredUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "limabiji",
  role: "Admin",
};

describe("GET /recipes/my-recipe", () => {
  test("berhasil mendapatkan data recipe berdasarkan user yang sedang loggin", async () => {
    let { status, body } = await request(app)
      .get("/recipes/my-recipe")
      .set("Authorization", `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body[0]).toHaveProperty("id", expect.any(Number));
    expect(body[0]).toHaveProperty("UserId", userId);
    expect(body[0]).toHaveProperty("title", expect.any(String));
    expect(body[0]).toHaveProperty("description", expect.any(String));
    expect(body[0]).toHaveProperty("ingredients", expect.any(String));
    expect(body[0]).toHaveProperty("steps", expect.any(String));
    expect(body[0]).toHaveProperty("cookTime", expect.any(Number));
    expect(body[0]).toHaveProperty("viewsCount", expect.any(Number));
    expect(body[0]).toHaveProperty("Reviews");
  });

  test("gagal menjalankan fitur karna belum login", async () => {
    let { status, body } = await request(app).get("/recipes/my-recipe");

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  test("gagal menjalankan fitur karna token tidak valid", async () => {
    let { status, body } = await request(app)
      .get("/recipes/my-recipe")
      .set("Authorization", `Bearer dsfsadfw4rfsfwse`);

    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });
});

beforeAll(async () => {
  const user = await User.create(registeredUser);
  token = generateToken(user.id);
  userId = user.id;

  await Recipe.create({
    title: "baru",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ingredients:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    steps: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cookTime: 20923,
    viewsCount: 3896,
    UserId: user.id,
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Recipes", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
