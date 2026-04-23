import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateExtrusionEntryDto } from "./dto/create-extrusion-entry.dto";
import { CreateVarnishEntryDto } from "./dto/create-varnish-entry.dto";
import { CreateSealantEntryDto } from "./dto/create-sealant-entry.dto";
import { CreateOffsetEntryDto } from "./dto/create-offset-entry.dto";

@Injectable()
export class ParamsService {
  constructor(private prisma: PrismaService) {}

  async createExtrusionEntry(dto: CreateExtrusionEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.extrusionParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
        select: { counter_value: true },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      const post = await tx.post.findUnique({
        where: { value: 1 },
      });

      if (!post) {
        throw new HttpException(
          ApiMessages.POST_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      const params = await tx.extrusionParam.create({
        data: dto,
      });
      await tx.status.create({
        data: {
          summary_id: dto.summary_id,
          post_id: post.id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
          extrusion_param_id: params.id,
        },
      });
      return { params };
    });
  }

  async createVarnishEntry(dto: CreateVarnishEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.varnishParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
        select: { counter_value: true },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      const post = await tx.post.findUnique({
        where: { value: 2 },
      });

      if (!post) {
        throw new HttpException(
          ApiMessages.POST_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      const params = await tx.varnishParam.create({
        data: dto,
      });
      await tx.status.create({
        data: {
          summary_id: dto.summary_id,
          post_id: post.id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
          varnish_param_id: params.id,
        },
      });
      return { params };
    });
  }

  async createOffsetEntry(dto: CreateOffsetEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.offsetParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
        select: { counter_value: true },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      const post = await tx.post.findUnique({
        where: { value: 3 },
      });

      if (!post) {
        throw new HttpException(
          ApiMessages.POST_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      const params = await tx.offsetParam.create({
        data: dto,
      });
      await tx.status.create({
        data: {
          summary_id: dto.summary_id,
          post_id: post.id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
          offset_param_id: params.id,
        },
      });
      return { params };
    });
  }

  async createSealantEntry(dto: CreateSealantEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.sealantParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
        select: { counter_value: true },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      const post = await tx.post.findUnique({
        where: { value: 4 },
      });

      if (!post) {
        throw new HttpException(
          ApiMessages.POST_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      const params = await tx.sealantParam.create({
        data: dto,
      });
      await tx.status.create({
        data: {
          summary_id: dto.summary_id,
          post_id: post.id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
          sealant_param_id: params.id,
        },
      });
      return { params };
    });
  }

  async getExtrusionById(id: number) {
    const parameters = await this.prisma.extrusionParam.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!parameters) {
      throw new HttpException(
        ApiMessages.PARAM_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    const summary = await this.prisma.summary.findUnique({
      where: { id: parameters.summary_id },
      include: { batch: true, product: true, conveyor: true },
    });
    if (!summary) {
      throw new HttpException("", HttpStatus.BAD_REQUEST);
    }
    const tresholds = await this.prisma.treshold.findFirst({
      where: {
        product_id: summary.product_id,
        conveyor_id: summary.conveyor_id,
        createdAt: { lte: parameters.createdAt },
      },
      orderBy: { id: "desc" },
    });

    const prev = await this.prisma.extrusionParam.findFirst({
      where: { id: { lt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "desc" },
      select: { id: true },
    });

    const next = await this.prisma.extrusionParam.findFirst({
      where: { id: { gt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "asc" },
      select: { id: true },
    });
    return {
      summary,
      parameters,
      tresholds,
      prev: prev?.id ?? null,
      next: next?.id ?? null,
    };
  }
  async getVarnishById(id: number) {
    const parameters = await this.prisma.varnishParam.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!parameters) {
      throw new HttpException(
        ApiMessages.PARAM_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    const summary = await this.prisma.summary.findUnique({
      where: { id: parameters.summary_id },
      include: { batch: true, product: true, conveyor: true },
    });
    if (!summary) {
      throw new HttpException("", HttpStatus.BAD_REQUEST);
    }
    const tresholds = await this.prisma.treshold.findFirst({
      where: {
        product_id: summary.product_id,
        conveyor_id: summary.conveyor_id,
        createdAt: { lte: parameters.createdAt },
      },
      orderBy: { id: "desc" },
    });

    const prev = await this.prisma.varnishParam.findFirst({
      where: { id: { lt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "desc" },
      select: { id: true },
    });

    const next = await this.prisma.varnishParam.findFirst({
      where: { id: { gt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "asc" },
      select: { id: true },
    });
    return {
      summary,
      parameters,
      tresholds,
      prev: prev?.id ?? null,
      next: next?.id ?? null,
    };
  }
  async getOffsetById(id: number) {
    const parameters = await this.prisma.offsetParam.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!parameters) {
      throw new HttpException(
        ApiMessages.PARAM_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    const summary = await this.prisma.summary.findUnique({
      where: { id: parameters.summary_id },
      include: { batch: true, product: true, conveyor: true },
    });
    if (!summary) {
      throw new HttpException("", HttpStatus.BAD_REQUEST);
    }
    const tresholds = await this.prisma.treshold.findFirst({
      where: {
        product_id: summary.product_id,
        conveyor_id: summary.conveyor_id,
        createdAt: { lte: parameters.createdAt },
      },
      orderBy: { id: "desc" },
    });

    const prev = await this.prisma.offsetParam.findFirst({
      where: { id: { lt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "desc" },
      select: { id: true },
    });

    const next = await this.prisma.offsetParam.findFirst({
      where: { id: { gt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "asc" },
      select: { id: true },
    });
    return {
      summary,
      parameters,
      tresholds,
      prev: prev?.id ?? null,
      next: next?.id ?? null,
    };
  }
  async getSealantById(id: number) {
    const parameters = await this.prisma.sealantParam.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!parameters) {
      throw new HttpException(
        ApiMessages.PARAM_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
    const summary = await this.prisma.summary.findUnique({
      where: { id: parameters.summary_id },
      include: { batch: true, product: true, conveyor: true },
    });
    if (!summary) {
      throw new HttpException("", HttpStatus.BAD_REQUEST);
    }
    const tresholds = await this.prisma.treshold.findFirst({
      where: {
        product_id: summary.product_id,
        conveyor_id: summary.conveyor_id,
        createdAt: { lte: parameters.createdAt },
      },
      orderBy: { id: "desc" },
    });

    const prev = await this.prisma.sealantParam.findFirst({
      where: { id: { lt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "desc" },
      select: { id: true },
    });

    const next = await this.prisma.sealantParam.findFirst({
      where: { id: { gt: id }, summary_id: parameters.summary_id },
      orderBy: { id: "asc" },
      select: { id: true },
    });
    return {
      summary,
      parameters,
      tresholds,
      prev: prev?.id ?? null,
      next: next?.id ?? null,
    };
  }
}
