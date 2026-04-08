import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.js";
import { RegisterUseCase } from "./register.js";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error.js";
import { MissingRequiredFieldError } from "./errors/missing-required-field-error.js";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterUseCase(orgsRepository);
  });

  it("should be able to register a new org", async () => {
    const { org } = await sut.execute({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should throw an error if required fields are missing", async () => {
    const orgRepositoryMock = {
      findByEmail: async () => null,
      create: async (data: any) => ({ id: "org-1", ...data }),
    };

    const registerUseCase = new RegisterUseCase(orgRepositoryMock as any);

    type RequiredField = "whatsapp" | "cep" | "address" | "city" | "state";

    const requiredFields: RequiredField[] = [
      "whatsapp",
      "cep",
      "address",
      "city",
      "state",
    ];

    for (const field of requiredFields) {
      const input = {
        responsible_name: "Test",
        email: "test@example.com",
        password: "123456",
        whatsapp: "12345678",
        cep: "12345-678",
        address: "Street 1",
        city: "City",
        state: "ST",
      };

      input[field] = "";

      await expect(
        registerUseCase.execute(input as any),
      ).rejects.toBeInstanceOf(MissingRequiredFieldError);
    }
  });

  it("should hash user password upon registration", async () => {
    const { org } = await sut.execute({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    const isPasswordCorrectlyHashed = await compare(
      "securepassword",
      org.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      responsible_name: "John Doe",
      email,
      password: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    await expect(() =>
      sut.execute({
        responsible_name: "John Doe 02",
        email,
        password: "securepassword",
        whatsapp: "+5511999999999",
        cep: "01001000",
        address: "Av. Paulista, 1000",
        city: "São Paulo",
        state: "SP",
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
