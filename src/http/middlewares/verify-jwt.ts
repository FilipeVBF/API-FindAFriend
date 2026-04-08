import type { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error();
    }

    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }
}
