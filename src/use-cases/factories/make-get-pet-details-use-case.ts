import { GetPetDetailsUseCase } from "../get-pet-details.js";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.js";

export function makeGetPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetDetailsUseCase(petsRepository);

  return useCase;
}
