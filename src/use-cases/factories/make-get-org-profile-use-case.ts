import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository.js";
import { RegisterUseCase } from "../register.js";
import { GetOrgProfileUseCase } from "../get-org-profile.js";

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const useCase = new GetOrgProfileUseCase(orgsRepository);

  return useCase;
}
