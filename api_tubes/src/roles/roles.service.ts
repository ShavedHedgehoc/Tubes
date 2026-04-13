import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getRoles() {
    const roles = await this.prisma.role.findMany({
      orderBy: { description: "asc" },
    });
    return { roles };
  }
}
