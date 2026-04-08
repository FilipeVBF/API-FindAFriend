import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository.js";
import { RegisterUseCase } from "../register.js";

export function makeRegisterUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new RegisterUseCase(orgsRepository);

  return useCase;
}
