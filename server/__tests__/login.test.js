const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");

describe("/login", () => {
  test("berhasil login dan mengirimkan token", async () => {
    let { status, body } = await request(app).post("/login").send({
      email: "admin@mail.com",
      password: "limabiji",
    });
    expect(status).toBe(200);
    expect(body).toHaveProperty("token", expect.any(String));
  });

  test("email tidak diberikan", async () => {
    let { status, body } = await request(app).post("/login").send({
      password: "f",
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "email is required");
  });
  test("password tidak diberikan", async () => {
    let { status, body } = await request(app).post("/login").send({
      email: "admin@mail.com",
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "password is required");
  });

  test("email tidak valid", async () => {
    let { status, body } = await request(app).post("/login").send({
      email: "siapa@mail.com",
      password: "f",
    });
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "error invalid email or password");
  });
  test("password tidak valid", async () => {
    let { status, body } = await request(app).post("/login").send({
      email: "admin@mail.com",
      password: "siapa",
    });
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "error invalid email or password");
  });

  test("user tidak ada", async () => {
    let { status, body } = await request(app).post("/login").send({
      email: "siapa@mail.com",
      password: "f",
    });
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "error invalid email or password");
  });
});

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "admin",
        email: "admin@mail.com",
        password: hashPassword("limabiji"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
