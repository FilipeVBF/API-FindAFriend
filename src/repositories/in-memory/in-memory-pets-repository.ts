import type {
  AdoptionRequirement,
  Pet,
  PetPhoto,
  Prisma,
} from "generated/prisma/client.js";
import type { PetsRepository } from "../pets-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];
  public adoptionRequirements: AdoptionRequirement[] = [];
  public petPhotos: PetPhoto[] = [];

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id) || null;

    if (!pet) {
      return null;
    }

    const adoptionRequirements = this.adoptionRequirements.filter(
      (requirement) => requirement.pet_id === pet.id,
    );

    const petPhotos = this.petPhotos.filter((photo) => photo.pet_id === pet.id);

    return {
      ...pet,
      adoption_requirements: adoptionRequirements,
      pet_photos: petPhotos,
    };
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      type: data.type ?? "DOG",
      age: data.age ?? "PUPPY",
      about: data.about,
      size: data.size ?? "SMALL",
      energy_level: data.energy_level,
      independence_level: data.independence_level ?? "LOW",
      environment_type: data.environment_type ?? "SMALL_SPACE",
      created_at: new Date(),
      org_id: data.org_id,
    };

    this.items.push(pet);

    return pet;
  }

  async addAdoptionRequirement(
    data: Prisma.AdoptionRequirementUncheckedCreateInput,
  ) {
    const adoptionRequirement = {
      id: randomUUID(),
      description: data.description,
      pet_id: data.pet_id,
    };

    this.adoptionRequirements.push(adoptionRequirement);

    return adoptionRequirement;
  }

  async addPetPhoto(data: Prisma.PetPhotoUncheckedCreateInput) {
    const petPhoto = {
      id: randomUUID(),
      url: data.url,
      pet_id: data.pet_id,
    };

    this.petPhotos.push(petPhoto);

    return petPhoto;
  }
}
