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
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      await tx.extrusionStatus.create({
        data: {
          summary_id: dto.summary_id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
        },
      });
      return await tx.extrusionParam.create({
        data: dto,
      });
    });
  }

  async createVarnishEntry(dto: CreateVarnishEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.varnishParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      await tx.varnishStatus.create({
        data: {
          summary_id: dto.summary_id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
        },
      });
      return await tx.varnishParam.create({
        data: dto,
      });
    });
  }

  async createOffsetEntry(dto: CreateOffsetEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.offsetParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      await tx.offsetStatus.create({
        data: {
          summary_id: dto.summary_id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
        },
      });
      return await tx.offsetParam.create({
        data: dto,
      });
    });
  }

  async createSealantEntry(dto: CreateSealantEntryDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastEntry = await tx.sealantParam.findFirst({
        where: { summary_id: dto.summary_id },
        orderBy: { createdAt: "desc" },
      });
      if (lastEntry && lastEntry.counter_value > dto.counter_value)
        throw new HttpException(
          ApiMessages.COUNTER_LESS_THEN_LAST_VALUE,
          HttpStatus.BAD_REQUEST,
        );
      await tx.sealantStatus.create({
        data: {
          summary_id: dto.summary_id,
          employee_id: dto.employee_id,
          counter_value: dto.counter_value,
        },
      });
      return await tx.sealantParam.create({
        data: dto,
      });
    });
  }
}
