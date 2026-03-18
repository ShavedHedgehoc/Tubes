import { Module } from '@nestjs/common';
import { FilePathService } from './file-path.service';
import { FilePathController } from './file-path.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FilePathService],
  controllers: [FilePathController],
  imports: [PrismaModule],
})
export class FilePathModule { }
