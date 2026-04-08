import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import { hash } from "bcryptjs";
import type { Org } from "generated/prisma/client.js";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error.js";
import { MissingRequiredFieldError } from "./errors/missing-required-field-error.js";

interface RegisterUseCaseRequest {
  responsible_name: string;
  email: string;
  password: string;
  whatsapp: string;
  cep: string;
  address: string;
  city: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface RegisterUseCaseResponse {
  org: Org;
}

export class RegisterUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    responsible_name,
    email,
    password,
    whatsapp,
    cep,
    address,
    city,
    state,
    latitude,
    longitude,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    if (!whatsapp || !cep || !address || !city || !state) {
      throw new MissingRequiredFieldError();
    }

    const org = await this.orgRepository.create({
      responsible_name,
      email,
      password_hash,
      address,
      cep,
      city,
      state,
      whatsapp,
      latitude: latitude ?? null,
      longitude: longitude ?? null,
    });

    return { org };
  }
}
