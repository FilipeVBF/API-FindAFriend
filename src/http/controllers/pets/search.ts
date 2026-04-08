import { makeSearchPetUseCase } from "@/use-cases/factories/make-search-pet-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    city: z.string(),
    state: z.string(),
    type: z
      .string()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(["DOG", "CAT"]))
      .optional(),
    age: z
      .string()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(["PUPPY", "ADULT", "SENIOR"]))
      .optional(),
    size: z
      .string()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(["SMALL", "MEDIUM", "LARGE"]))
      .optional(),
    energy_level: z.coerce.number().min(1).max(5).optional(),
    independence_level: z
      .string()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(["LOW", "MEDIUM", "HIGH"]))
      .optional(),
    environment_type: z
      .string()
      .transform((val) => val.toUpperCase())
      .pipe(z.enum(["SMALL_SPACE", "LARGE_SPACE"]))
      .optional(),
    page: z.coerce.number().min(1).default(1),
  });

  const query = searchQuerySchema.parse(request.query);

  const searchPetUseCase = makeSearchPetUseCase();

  const { pets } = await searchPetUseCase.execute(query);

  return reply.status(200).send({ pets });
}
