import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.js";
import { GetOrgProfileUseCase } from "./get-org-profile.js";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgProfileUseCase;

describe("Get Org Profile Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it("should be able to get org profile", async () => {
    const createdOrg = await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    });

    expect(org.responsible_name).toEqual("John Doe");
  });

  it("should not be able to get org profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        orgId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
