import { app } from "@/app.js";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Zeus",
        type: "DOG",
        age: "ADULT",
        about: "A confident dog with a protective nature.",
        energy_level: 3,
        environment_type: "LARGE_SPACE",
        independence_level: "HIGH",
        size: "LARGE",
        adoption_requirements: [
          "Must have a secure yard",
          "Must have experience with dogs",
          "Must provide consistent training",
        ],
        pet_photos: ["https://example.com/photos/zeus1.jpg"],
      });

    expect(response.statusCode).toEqual(201);
  });
});
