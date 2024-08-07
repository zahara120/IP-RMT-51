const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

describe("/register", () => {
  test("berhasil registrasi", async () => {
    let { status, body } = await request(app).post("/register").send({
      username: "admin",
      email: "admin@mail.com",
      password: "limabiji",
    });
    expect(status).toBe(201);
    expect(body).toHaveProperty("id", expect.any(Number));
    expect(body).toHaveProperty("username", "admin");
    expect(body).toHaveProperty("email", "admin@mail.com");
    expect(body).not.toHaveProperty("password");
  });

  test("username tidak diberikan", async () => {
    let { status, body } = await request(app).post("/register").send({
      email: "admin@mail.com",
      password: "limabiji",
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", ["username is required"]);
  });
  test("email tidak diberikan", async () => {
    let { status, body } = await request(app).post("/register").send({
      username: "admin",
      password: "limabiji",
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", ["email is required"]);
  });
  test("password tidak diberikan", async () => {
    let { status, body } = await request(app).post("/register").send({
      username: "admin",
      email: "admin@mail.com",
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", ["password is required"]);
  });

  test("email tidak valid", async () => {
    let { status, body } = await request(app).post("/register").send({
      username: "admin",
      email: "siapa?",
      password: "limabiji",
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", ["email is not valid"]);
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
