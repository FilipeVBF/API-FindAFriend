import { MissingRequiredFieldError } from "@/use-cases/errors/missing-required-field-error.js";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error.js";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    responsible_name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    cep: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    latitude: z
      .number()
      .refine((value) => Math.abs(value) <= 90)
      .nullable(),
    longitude: z
      .number()
      .refine((value) => Math.abs(value) <= 180)
      .nullable(),
  });

  const {
    responsible_name,
    email,
    password,
    whatsapp,
    cep,
    address,
    city,
    state,
    latitude,
    longitude,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      responsible_name,
      email,
      password,
      whatsapp,
      cep,
      address,
      city,
      state,
      latitude,
      longitude,
    });
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof MissingRequiredFieldError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
