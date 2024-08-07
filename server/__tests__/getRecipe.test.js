const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Recipe } = require("../models");

let userId = "";

const registeredUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "limabiji",
  role: "Admin",
};

describe("GET /recipes", () => {
  test("berhasil mendapatkan data recipe", async () => {
    let { status, body } = await request(app).get("/recipes");
    expect(status).toBe(200);
    expect(body[0]).toHaveProperty("id", expect.any(Number));
    expect(body[0]).toHaveProperty("title", expect.any(String));
    expect(body[0]).toHaveProperty("description", expect.any(String));
    expect(body[0]).toHaveProperty("ingredients", expect.any(String));
    expect(body[0]).toHaveProperty("steps", expect.any(String));
    expect(body[0]).toHaveProperty("cookTime", expect.any(Number));
    expect(body[0]).toHaveProperty("viewsCount", expect.any(Number));
    expect(body[0].User).toHaveProperty("id", expect.any(Number));
    expect(body[0].User).toHaveProperty("username", "admin");
    expect(body[0].User).toHaveProperty("email", "admin@mail.com");
    expect(body[0].User).not.toHaveProperty("password");
    expect(body[0]).toHaveProperty("Reviews");
  });
});

beforeAll(async () => {
  const user = await User.create(registeredUser);
  userId = user.id;

  await Recipe.create({
    title: "baru",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ingredients:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    steps: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cookTime: 180,
    viewsCount: 1080,
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
