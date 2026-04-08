import { app } from "@/app.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh token", async () => {
    await request(app.server).post("/orgs").send({
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

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "securepassword",
    });

    const cookies = await authResponse.get("Set-Cookie");

    if (!cookies) {
      throw new Error("Cookies not found.");
    }

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken=")]),
    );
  });
});
