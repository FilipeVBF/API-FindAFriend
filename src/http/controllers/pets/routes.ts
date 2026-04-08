import type { FastifyInstance } from "fastify";
import { create } from "./create.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { details } from "./details.js";
import { search } from "./search.js";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pets/:petId", details);
  app.get("/pets/search", search);

  /* Authenticated */
  app.post("/pets", { onRequest: verifyJWT }, create);
}
