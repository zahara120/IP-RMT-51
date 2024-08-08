const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Recipe } = require("../models");

let userId = "";
let recipeId = "";

const registeredUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "limabiji",
  role: "Admin",
};

describe("GET /recipes/:id", () => {
  test("berhasil mendapatkan detail recipe berdasarkan id yang dikirim", async () => {
    let { status, body } = await request(app)
      .get(`/recipes/${recipeId}`)

    expect(status).toBe(200);
    expect(body.id).toEqual(1);
  });

  test("gagal mendapatkan data news karena params id yang diberikan tidak ada di database", async () => {
    let { status, body } = await request(app)
        .get("/recipes/9000")
    expect(status).toBe(404);
    expect(body).toHaveProperty("message", "error not found");
});
});

beforeAll(async () => {
  const user = await User.create(registeredUser);
  userId = user.id;

  let recipe = await Recipe.create({
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
  recipeId = recipe.id;
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
