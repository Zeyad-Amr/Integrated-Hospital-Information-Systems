import { Module } from '@nestjs/common';
import { MedicalProblemService } from './medical-problem.service';
import { MedicalProblemController } from './medical-problem.controller';
import { MedicalProblemRepo } from './medical-problem.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [MedicalProblemController],
  providers: [MedicalProblemService,MedicalProblemRepo,PrismaService],
})
export class MedicalProblemModule {}
