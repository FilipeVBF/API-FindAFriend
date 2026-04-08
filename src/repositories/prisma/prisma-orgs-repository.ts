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

    if (!org) return null;

    return {
      ...org,
      latitude: org.latitude ? org.latitude.toNumber() : null,
      longitude: org.longitude ? org.longitude.toNumber() : null,
    };
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    if (!org) return null;

    return {
      ...org,
      latitude: org.latitude ? org.latitude.toNumber() : null,
      longitude: org.longitude ? org.longitude.toNumber() : null,
    };
  }

  async create(data: OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return {
      ...org,
      latitude: org.latitude ? org.latitude.toNumber() : null,
      longitude: org.longitude ? org.longitude.toNumber() : null,
    };
  }
}
