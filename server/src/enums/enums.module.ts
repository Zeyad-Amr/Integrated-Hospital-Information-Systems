import { Module } from '@nestjs/common';
import { EnumsService } from './enums.service';
import { EnumsController } from './enums.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [EnumsController],
  providers: [EnumsService, PrismaService],
})
export class EnumsModule { }
