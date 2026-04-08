import { app } from "@/app.js";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get org profile", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const profileResponse = await request(app.server)
      .get("/org/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
  });
});
