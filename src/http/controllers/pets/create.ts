import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    type: z.enum(["DOG", "CAT"]),
    age: z.enum(["PUPPY", "ADULT", "SENIOR"]),
    about: z.string(),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    energy_level: z.int().min(1).max(5),
    independence_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
    environment_type: z.enum(["SMALL_SPACE", "LARGE_SPACE"]),
    adoption_requirements: z.array(z.string()),
    pet_photos: z.array(z.string()),
  });

  const {
    name,
    type,
    age,
    about,
    size,
    energy_level,
    independence_level,
    environment_type,
    adoption_requirements,
    pet_photos,
  } = createBodySchema.parse(request.body);

  try {
    const createUseCase = makeCreatePetUseCase();

    const pet = await createUseCase.execute({
      name,
      type,
      age,
      about,
      size,
      energy_level,
      independence_level,
      environment_type,
      org_id: request.user.sub,
      adoption_requirements,
      pet_photos,
    });

    return reply.status(201).send(pet);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
}
