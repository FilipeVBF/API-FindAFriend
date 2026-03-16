import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.js";
import { GetPetUseCase } from "./get-pet.js";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetUseCase;

describe("Get Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetUseCase(petsRepository);
  });

  it("should be able to get pet details", async () => {
    const createdPet = await petsRepository.create({
      name: "Buddy",
      type: "DOG",
      age: "PUPPY",
      about: "A friendly puppy looking for a home.",
      energy_level: 3,
      environment_type: "SMALL_SPACE",
      independence_level: "LOW",
      size: "SMALL",
      org_id: "org-1",
    });

    const adoptionRequirement = await petsRepository.addAdoptionRequirement({
      pet_id: createdPet.id,
      description: "Must have a fenced yard",
    });

    const petPhoto = await petsRepository.addPetPhoto({
      pet_id: createdPet.id,
      url: "https://example.com/photos/buddy1.jpg",
    });

    const { pet } = await sut.execute({
      pet_id: createdPet.id,
    });

    expect(pet.name).toEqual("Buddy");
  });

  it("should not be able to get pet details with wrong id", async () => {
    await expect(() =>
      sut.execute({
        pet_id: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
