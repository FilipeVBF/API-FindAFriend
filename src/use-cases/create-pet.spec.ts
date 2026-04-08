import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.js";
import { CreatePetUseCase } from "./create-pet.js";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a new pet", async () => {
    const { pet } = await sut.execute({
      name: "Buddy",
      type: "DOG",
      age: "PUPPY",
      about: "A friendly puppy looking for a home.",
      energy_level: 3,
      environment_type: "SMALL_SPACE",
      independence_level: "LOW",
      size: "SMALL",
      org_id: "org-1",
      adoption_requirements: [
        "Must have a fenced yard",
        "Must be at least 18 years old",
        "Must have experience with dogs",
      ],
      pet_photos: [
        "https://example.com/photos/buddy1.jpg",
        "https://example.com/photos/buddy2.jpg",
      ],
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
