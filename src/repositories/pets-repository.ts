import type {
  AdoptionRequirement,
  Pet,
  PetPhoto,
  Prisma,
} from "generated/prisma/client.js";

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;

  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;

  addAdoptionRequirement(
    data: Prisma.AdoptionRequirementUncheckedCreateInput,
  ): Promise<AdoptionRequirement>;

  addPetPhoto(data: Prisma.PetPhotoUncheckedCreateInput): Promise<PetPhoto>;
}
