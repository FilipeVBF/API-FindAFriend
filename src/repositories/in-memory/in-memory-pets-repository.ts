import type { PetsRepository, SearchPetsQuery } from "../pets-repository.js";
import { randomUUID } from "node:crypto";
import type { Org } from "@/types/org.js";
import type { AdoptionRequirement, Pet, PetPhoto } from "@/types/pet.js";
import type { Prisma } from "../../../generated/prisma/client.js";

export class InMemoryPetsRepository implements PetsRepository {
  public orgs: Org[] = [];
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

  async searchMany(query: SearchPetsQuery) {
    const {
      city,
      state,
      page,
      type,
      age,
      size,
      energy_level,
      independence_level,
      environment_type,
    } = query;

    const orgsInLocation = this.orgs.filter(
      (org) => org.city === city && org.state === state,
    );
    const orgsIds = orgsInLocation.map((org) => org.id);

    const filteredPets = this.items
      .filter((pet) => {
        if (!orgsIds.includes(pet.org_id)) {
          return false;
        }

        if (type && pet.type !== type) return false;
        if (age && pet.age !== age) return false;
        if (size && pet.size !== size) return false;
        if (energy_level && pet.energy_level !== energy_level) return false;
        if (independence_level && pet.independence_level !== independence_level)
          return false;
        if (environment_type && pet.environment_type !== environment_type)
          return false;

        return true;
      })
      .slice((page - 1) * 20, page * 20);

    return filteredPets;
  }
}
