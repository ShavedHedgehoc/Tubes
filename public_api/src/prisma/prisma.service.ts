import { Injectable } from "@nestjs/common";
// import { PrismaClient, Prisma } from "../../generated/prisma/client";
import { PrismaClient, Prisma } from "db";

// export type PrismaDb = Prisma.TransactionClient | PrismaClient;
// export type PrismaDb = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0] | PrismaClient;
export type PrismaDb =
  | Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0]
  | PrismaClient;

@Injectable()
export class PrismaService extends PrismaClient {}
