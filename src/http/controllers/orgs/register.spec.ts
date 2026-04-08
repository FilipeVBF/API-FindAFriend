import { app } from "@/app.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/orgs").send({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      latitude: -23.55052,
      longitude: -46.633308,
    });

    expect(response.statusCode).toBe(201);
  });
});
