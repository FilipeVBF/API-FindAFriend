import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-get-pet-details-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsSchema = z.object({
    petId: z.uuid(),
  });

  const { petId } = detailsParamsSchema.parse(request.params);

  const getPetDetails = makeGetPetDetailsUseCase();

  const { pet } = await getPetDetails.execute({
    pet_id: petId,
  });

  return reply.status(200).send({ pet });
}
