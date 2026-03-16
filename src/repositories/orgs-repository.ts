import type { Org, Prisma } from "generated/prisma/client.js";

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
