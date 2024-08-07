const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Recipe } = require("../models");
const { generateToken } = require("../helpers/jwt");

let token = "";
let userId = "";

const registeredUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "limabiji",
  role: "Admin",
};

describe("POST /recipes", () => {
  test("berhasil membuat recipe", async () => {
    let { status, body } = await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        UserId: userId,
        title: "Vegetarian Chili Oil",
        description: "Deep fry for 30 minutes",
        ingredients: "butter, chili",
        steps: "Chop onions and chili",
        cookTime: 3503,
      });
    expect(status).toBe(201);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("UserId", userId);
    expect(body).toHaveProperty("title", "Vegetarian Chili Oil");
    expect(body).toHaveProperty("description", "Deep fry for 30 minutes");
    expect(body).toHaveProperty("ingredients", "butter, chili");
    expect(body).toHaveProperty("steps", "Chop onions and chili");
    expect(body).toHaveProperty("cookTime", 3503);
  });

  test("gagal menjalankan fitur karna belum login", async () => {
    let { status, body } = await request(app).post("/recipes").send({
      UserId: userId,
      title: "Vegetarian Chili Oil",
      description: "Deep fry for 30 minutes",
      ingredients: "butter, chili",
      steps: "Chop onions and chili",
      cookTime: 3503,
    });
    // console.log({ status, body });
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  test("gagal menjalankan fitur karna token tidak valid", async () => {
    let { status, body } = await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer dsfsadfw4rfsfwse`)
      .send({
        UserId: userId,
        title: "Vegetarian Chili Oil",
        description: "Deep fry for 30 minutes",
        ingredients: "butter, chili",
        steps: "Chop onions and chili",
        cookTime: 3503,
      });
    // console.log({ status, body });
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Unauthenticated");
  });

  test("gagal karna request body tidak sesuai", async () => {
    let { status, body } = await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        UserId: "",
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        cookTime: "",
      });
    // console.log({ status, body });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", [
      "title is required",
      "description is required",
      "ingredients is required",
      "steps is required",
      "cookTime is required",
    ]);
  });
});

beforeAll(async () => {
  const user = await User.create(registeredUser);
  token = generateToken(user.id);
  userId = user.id;
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
