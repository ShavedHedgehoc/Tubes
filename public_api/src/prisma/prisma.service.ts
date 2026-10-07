import { Injectable } from "@nestjs/common";
import { PrismaClient } from "db";

// export type PrismaDb =
//   | Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0]
//   | PrismaClient;

@Injectable()
export class PrismaService extends PrismaClient {}
