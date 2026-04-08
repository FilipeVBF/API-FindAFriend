import type {
  AdoptionRequirement,
  Age,
  EnvironmentType,
  IndependenceLevel,
  Pet,
  PetPhoto,
  PetType,
  Size,
} from "@/types/pet.js";
import type { Prisma } from "../../generated/prisma/client.js";

export interface SearchPetsQuery {
  city: string;
  state: string;
  type?: PetType | undefined;
  age?: Age | undefined;
  size?: Size | undefined;
  energy_level?: number | undefined;
  independence_level?: IndependenceLevel | undefined;
  environment_type?: EnvironmentType | undefined;
  page: number;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;

  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;

  addAdoptionRequirement(
    data: Prisma.AdoptionRequirementUncheckedCreateInput,
  ): Promise<AdoptionRequirement>;

  addPetPhoto(data: Prisma.PetPhotoUncheckedCreateInput): Promise<PetPhoto>;

  searchMany(query: SearchPetsQuery): Promise<Pet[]>;
}
