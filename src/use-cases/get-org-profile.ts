import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import type { Org } from "@/types/org.js";

interface GetOrgProfileUseCaseRequest {
  orgId: string;
}

interface GetOrgProfileUseCaseResponse {
  org: Org;
}

export class GetOrgProfileUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId);

    if (!org) {
      throw new Error("Org not found");
    }

    return {
      org,
    };
  }
}
