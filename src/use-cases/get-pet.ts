import type { PetsRepository } from "@/repositories/pets-repository.js";
import type {
  AdoptionRequirement,
  Age,
  EnvironmentType,
  IndependenceLevel,
  Pet,
  PetPhoto,
  PetType,
  Size,
} from "generated/prisma/client.js";

interface GetPetUseCaseRequest {
  pet_id: string;
}

interface GetPetUseCaseResponse {
  pet: Pet & {
    adoption_requirements?: AdoptionRequirement[];
  } & {
    pet_photos?: PetPhoto[];
  };
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new Error("Pet not found.");
    }

    return {
      pet,
    };
  }
}
