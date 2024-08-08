const request = require("supertest");
const app = require("../app");

describe("/donation", () => {
  test("berhasil donasi dan mengirimkan transaction token", async () => {
    let { status, body } = await request(app).post("/donation").send({
      amount: 5000
    });
    expect(status).toBe(200);
    expect(body).toHaveProperty("transactionToken", expect.any(String));
  });

  test("amount tidak diberikan", async () => {
    let { status, body } = await request(app).post("/donation").send({
      amount: ""
    });
    expect(status).toBe(400);
    expect(body).toHaveProperty("message", "amount is required");
  });
});

