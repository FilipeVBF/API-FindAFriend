import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import { compare } from "bcryptjs";
import type { Org } from "generated/prisma/client.js";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      // Criar um erro personalizado
      throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await compare(password, org.password_hash);

    if (!isPasswordValid) {
      // Criar um erro personalizado
      throw new Error("Invalid credentials.");
    }

    return { org };
  }
}
