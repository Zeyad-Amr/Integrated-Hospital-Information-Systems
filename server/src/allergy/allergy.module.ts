import { Module } from '@nestjs/common';
import { AllergyService } from './allergy.service';
import { AllergyController } from './allergy.controller';
import { AllergyRepo } from './allergy.repo';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';

@Module({
  controllers: [AllergyController],
  providers: [AllergyService,AllergyRepo,PrismaService],
})
export class AllergyModule {}
