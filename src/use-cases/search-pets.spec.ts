import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository.js";
import { SearchPetsUseCase } from "./search-pets.js";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository.js";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    petsRepository.orgs = orgsRepository.items;
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("should be able to search pets by city and state", async () => {
    const org = await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    await petsRepository.create({
      name: "Dog 1",
      org_id: org.id,
      about: "A friendly dog",
      energy_level: 3,
    });

    await petsRepository.create({
      name: "Cat 1",
      org_id: org.id,
      about: "A friendly cat",
      energy_level: 2,
    });

    const { pets } = await sut.execute({
      city: "São Paulo",
      state: "SP",
      page: 1,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Dog 1" }),
      expect.objectContaining({ name: "Cat 1" }),
    ]);
  });

  it("should not return pets from other cities", async () => {
    const org1 = await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    const org2 = await orgsRepository.create({
      responsible_name: "John Doe 02",
      email: "johndoe2@example.com",
      password_hash: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "Rio de Janeiro",
      state: "RJ",
    });

    await petsRepository.create({
      name: "Dog 1",
      org_id: org1.id,
      about: "",
      energy_level: 3,
    });

    await petsRepository.create({
      name: "Dog 2",
      org_id: org2.id,
      about: "",
      energy_level: 3,
    });

    const { pets } = await sut.execute({
      city: "Rio de Janeiro",
      state: "RJ",
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Dog 2" })]);
  });

  it("should be able to filter pets by type", async () => {
    const org = await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    await petsRepository.create({
      name: "Dog",
      type: "DOG",
      org_id: org.id,
      about: "",
      energy_level: 3,
    });

    await petsRepository.create({
      name: "Cat",
      type: "CAT",
      org_id: org.id,
      about: "",
      energy_level: 3,
    });

    const { pets } = await sut.execute({
      city: "São Paulo",
      state: "SP",
      type: "DOG",
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Dog" })]);
  });

  it("should be able to paginate results", async () => {
    const org = await orgsRepository.create({
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "securepassword",
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
    });

    for (let i = 1; i < 26; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        org_id: org.id,
        about: "",
        energy_level: 3,
      });
    }

    const { pets } = await sut.execute({
      city: "São Paulo",
      state: "SP",
      page: 2,
    });

    expect(pets).toHaveLength(5);
  });

  it("should not be able to search without city and state", async () => {
    await expect(() =>
      sut.execute({
        city: "",
        state: "",
        page: 1,
      }),
    ).rejects.toThrow();
  });
});
