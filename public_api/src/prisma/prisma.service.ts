import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'db';

@Injectable()
export class PrismaService extends PrismaClient {}
