import { Injectable } from "@nestjs/common";
import { PrismaClient, Prisma } from "../../generated/prisma/client";

export type PrismaDb = Prisma.TransactionClient | PrismaClient;

@Injectable()
export class PrismaService extends PrismaClient {}
