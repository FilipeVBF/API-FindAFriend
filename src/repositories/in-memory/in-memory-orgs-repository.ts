import type { OrgsRepository } from "../orgs-repository.js";
import { randomUUID } from "node:crypto";
import type { Org } from "@/types/org.js";
import type { Prisma } from "../../../generated/prisma/client.js";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id) || null;

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      cep: data.cep,
      address: data.address,
      city: data.city,
      state: data.state,
      latitude: data.latitude ? parseFloat(data.latitude.toString()) : null,
      longitude: data.longitude ? parseFloat(data.longitude.toString()) : null,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }
}
