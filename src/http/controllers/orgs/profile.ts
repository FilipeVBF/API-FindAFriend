import { makeGetOrgProfileUseCase } from "@/use-cases/factories/make-get-org-profile-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfileUseCase = makeGetOrgProfileUseCase();

  const { org } = await getOrgProfileUseCase.execute({
    orgId: request.user.sub,
  });

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  });
}
