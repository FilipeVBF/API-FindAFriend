import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import type { Org } from "@/types/org.js";

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
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, org.password_hash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
