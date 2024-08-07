const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

describe("/google-login", () => {
  // test("berhasil login dengan google dan mengirimkan token jwt", async () => {
  //   let { status, body } = await request(app).post("/google-login").send({
  //     googleToken: "sdjfwr4928nsdfkslaj3829"
  //   });
  //   expect(status).toBe(200);
  //   expect(body).toHaveProperty("token", expect.any(String));
  //   expect(body).toHaveProperty("email", expect.any(String));
  // });

  test("google token tidak ada", async () => {
    let { status, body } = await request(app).post("/google-login").send({
      googleToken: ""
    });
    expect(status).toBe(401);
    expect(body).toHaveProperty("message", "Login failed");
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
