import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { TransferRepo } from './transfer.repo';

@Module({
  controllers: [TransferController],
  providers: [TransferService, PrismaService, TransferRepo],
})
export class TransferModule { }
