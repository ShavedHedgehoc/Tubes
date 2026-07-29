import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { mappedConveyors } from "./mapper";
import { ConveyorsDataResponse } from "./dto/conveyors-data.response";

@Injectable()
export class ConveyorsService {
  constructor(private prisma: PrismaService) {}

  // used in dashboard conveyor service
  async getConveyorByName(name: string) {
    const conveyor = await this.prisma.conveyor.findUnique({
      where: { name: name },
    });
    return conveyor;
  }
  async getConveyorById(id: number) {
    return this.prisma.conveyor.findUnique({ where: { id: id } });
  }

  async getConveyors() {
    const conveyors = await this.prisma.conveyor.findMany();
    if (!conveyors) {
      throw new HttpException("Conveyors not found", HttpStatus.NOT_FOUND);
    }
    return { conveyors };
  }

  async getAllConveyors() {
    const conveyors = await this.prisma.conveyor.findMany();
    if (!conveyors) {
      throw new HttpException("Conveyors not found", HttpStatus.NOT_FOUND);
    }
    return conveyors;
  }

  async getConveyorsData(): Promise<ConveyorsDataResponse> {
    const conveyors = await this.prisma.conveyor.findMany({
      include: {
        summaries: {
          where: { isActive: true },
          include: {
            batch: true,
            product: true,
            statuses: {
              include: { employee: true },
              orderBy: { id: "desc" },
            },
            laboratory_locks: {
              where: { is_active: true },
              include: { laboratory_lock_reason: true },
              orderBy: { id: "desc" },
            },
          },
        },
      },
    });
    return {
      conveyors: conveyors.map((conveyor) => {
        const summary = conveyor.summaries?.[0] || null;
        const allStatuses = summary?.statuses || [];
        const allLocks = summary?.laboratory_locks || [];

        const getLastStatusByPost = (postId: number) => {
          const status = allStatuses.find((s) => s.post_id === postId) || null;
          const lock = allLocks.find((l) => l.post_id === postId) || null;
          return {
            status: status,
            employee: status?.employee || null,
            hasLock: !!lock,
            lockReason: lock?.laboratory_lock_reason.value ?? null,
          };
        };

        const extrusion = getLastStatusByPost(1);
        const varnish = getLastStatusByPost(2);
        const offset = getLastStatusByPost(3);
        const sealant = getLastStatusByPost(4);

        return mappedConveyors({
          conveyor,
          summary,
          product: summary?.product || null,
          batch: summary?.batch || null,
          extrusion_status: extrusion.status,
          extrusion_employee: extrusion.employee,
          extrusion_has_lock: extrusion.hasLock,
          varnish_status: varnish.status,
          varnish_employee: varnish.employee,
          varnish_has_lock: varnish.hasLock,
          offset_status: offset.status,
          offset_employee: offset.employee,
          offset_has_lock: offset.hasLock,
          sealant_status: sealant.status,
          sealant_employee: sealant.employee,
          sealant_has_lock: sealant.hasLock,
          extrusion_lock_reason: extrusion.lockReason,
          varnish_lock_reason: varnish.lockReason,
          sealant_lock_reason: sealant.lockReason,
          offset_lock_reason: offset.lockReason,
        });
      }),
    };
  }
}
