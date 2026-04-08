import type { PetsRepository } from "@/repositories/pets-repository.js";
import type {
  AdoptionRequirement,
  Pet,
  PetPhoto,
} from "generated/prisma/client.js";

interface GetPetDetailsUseCaseRequest {
  pet_id: string;
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet & {
    adoption_requirements?: AdoptionRequirement[];
  } & {
    pet_photos?: PetPhoto[];
  };
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    pet_id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new Error("Pet not found.");
    }

    return {
      pet,
    };
  }
}
