import { app } from "@/app.js";
import { createAndAuthenticateOrg } from "@/utils/test/create-and-authenticate-org.js";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able search pets by city, state, and type", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    await request(app.server)
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

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Apollo",
        type: "CAT",
        age: "PUPPY",
        about: "A playful kitten with a curious nature.",
        energy_level: 5,
        environment_type: "SMALL_SPACE",
        independence_level: "LOW",
        size: "MEDIUM",
        adoption_requirements: [
          "Must have experience with cats",
          "Must provide a safe indoor environment",
        ],
        pet_photos: ["https://example.com/photos/apollo1.jpg"],
      });

    const response = await request(app.server)
      .get("/pets/search")
      .query({ city: "São Paulo", state: "SP", type: "DOG" })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets[0].name).toEqual("Zeus");
  });
});
