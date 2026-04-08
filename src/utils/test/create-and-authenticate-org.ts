import { prisma } from "@/lib/prisma.js";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      responsible_name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("securepassword", 6),
      whatsapp: "+5511999999999",
      cep: "01001000",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      latitude: -23.55052,
      longitude: -46.633308,
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "securepassword",
  });

  const { token } = authResponse.body;

  return { token };
}
