import { prisma } from "@/lib/prisma.js";
import type { OrgsRepository } from "../orgs-repository.js";
import type { OrgCreateInput } from "generated/prisma/models.js";

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }

  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
