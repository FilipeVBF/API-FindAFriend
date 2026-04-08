import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.js";
import { AuthenticateUseCase } from "./authenticate.js";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to authenticate the org", async () => {
    await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("securepassword", 6),
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    const { org } = await sut.execute({
      email: "johndoe@example.com",
      password: "securepassword",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("securepassword", 6),
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "wrongpassword",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "wrongemail@example.com",
        password: "securepassword",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
