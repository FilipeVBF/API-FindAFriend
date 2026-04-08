import type {
  PetsRepository,
  SearchPetsQuery,
} from "@/repositories/pets-repository.js";
import type { Pet } from "generated/prisma/client.js";

type SearchPetsUseCaseRequest = SearchPetsQuery;

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    query: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    if (!query.city || !query.state) {
      throw new Error("City and state are required");
    }

    const pets = await this.petsRepository.searchMany(query);

    return { pets };
  }
}
