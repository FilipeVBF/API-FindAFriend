import type { PetsRepository } from "@/repositories/pets-repository.js";
import type {
  AdoptionRequirement,
  Age,
  EnvironmentType,
  IndependenceLevel,
  Pet,
  PetPhoto,
  PetType,
  Size,
} from "generated/prisma/client.js";

interface CreatePetUseCaseRequest {
  name: string;
  type: PetType;
  age: Age;
  about: string;
  size: Size;
  energy_level: number;
  independence_level: IndependenceLevel;
  environment_type: EnvironmentType;
  org_id: string;

  adoption_requirements?: string[];
  pet_photos?: string[];
}

interface CreatePetUseCaseResponse {
  pet: Pet & {
    adoption_requirements?: AdoptionRequirement[];
  } & {
    pet_photos?: PetPhoto[];
  };
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    type,
    age,
    about,
    size,
    energy_level,
    independence_level,
    environment_type,
    org_id,
    adoption_requirements,
    pet_photos,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    if (!org_id) {
      throw new Error("Organization is required to create a pet.");
    }

    if (!name || !energy_level) {
      throw new Error("All pet details are required.");
    }

    if (energy_level < 0 || energy_level > 5) {
      throw new Error("Energy level must be between 0 and 5.");
    }

    const pet = await this.petsRepository.create({
      name,
      type,
      age,
      about,
      size,
      energy_level,
      independence_level,
      environment_type,
      org_id,
    });

    let adoptionRequirements: AdoptionRequirement[] = [];

    if (adoption_requirements) {
      adoptionRequirements = await Promise.all(
        adoption_requirements.map((requirement) =>
          this.petsRepository.addAdoptionRequirement({
            description: requirement,
            pet_id: pet.id,
          }),
        ),
      );
    }

    let petPhotos: PetPhoto[] = [];

    if (pet_photos) {
      petPhotos = await Promise.all(
        pet_photos.map((url) =>
          this.petsRepository.addPetPhoto({
            url,
            pet_id: pet.id,
          }),
        ),
      );
    }

    return {
      pet: {
        ...pet,
        adoption_requirements: adoptionRequirements,
        pet_photos: petPhotos,
      },
    };
  }
}
