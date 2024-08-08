const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Recipe } = require("../models");
const { generateToken } = require("../helpers/jwt");

let userId = "";

const registeredUser = {
  username: "admin",
  email: "admin@mail.com",
  password: "limabiji",
  role: "Admin",
};

describe("POST /recipes/ai-search", () => {
  test("berhasil menampilkan recipe dari AI", async () => {
    let { status, body } = await request(app)
      .post("/recipes/ai-search")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ingredients: "kambing"
      });
    expect(status).toBe(200);
    expect(body).toHaveProperty("title", expect.any(String));
    expect(body).toHaveProperty("description", expect.any(String));
    expect(body).toHaveProperty("ingredients", expect.any(String));
    expect(body).toHaveProperty("steps", expect.any(String));
    expect(body).toHaveProperty("cookTime", expect.any(Number));
  });

  test("gagal karna request body tidak sesuai", async () => {
    let { status, body } = await request(app)
      .post("/recipes/ai-search")
      .set("Authorization", `Bearer ${token}`)
    // console.log({ status, body });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "ingredients is required");
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
});
