import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CrewsService {
  constructor(private prisma: PrismaService) {}

  async getCrews() {
    const crews = await this.prisma.crew.findMany();
    return { crews: crews };
  }
}
