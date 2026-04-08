import { CreatePetUseCase } from "../create-pet.js";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository.js";

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new CreatePetUseCase(petsRepository);

  return useCase;
}
