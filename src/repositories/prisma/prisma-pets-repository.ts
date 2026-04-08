import { prisma } from "@/lib/prisma.js";
import type { PetsRepository, SearchPetsQuery } from "../pets-repository.js";
import type {
  AdoptionRequirementUncheckedCreateInput,
  PetPhotoUncheckedCreateInput,
  PetUncheckedCreateInput,
} from "../../../generated/prisma/models.js";

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        adoption_requirements: true,
        photos: true,
      },
    });

    return pet;
  }

  async create(data: PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async addAdoptionRequirement(data: AdoptionRequirementUncheckedCreateInput) {
    const adoptionRequirement = await prisma.adoptionRequirement.create({
      data,
    });

    return adoptionRequirement;
  }

  async addPetPhoto(data: PetPhotoUncheckedCreateInput) {
    const petPhoto = await prisma.petPhoto.create({
      data,
    });

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

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
          state,
        },

        ...(type && { type }),
        ...(age && { age }),
        ...(size && { size }),
        ...(energy_level && { energy_level }),
        ...(independence_level && { independence_level }),
        ...(environment_type && { environment_type }),
      },

      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }
}
