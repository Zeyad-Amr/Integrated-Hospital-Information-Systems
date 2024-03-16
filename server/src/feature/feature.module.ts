import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { PrismaService } from 'src/shared/services/prisma-client/prisma.service';
import { FeatureRepo } from './feature.repo';
import { SubDepartmentRepo } from 'src/subdepartment/subdepartment.repo';
import { RoomRepo } from 'src/room/room.repo';
import { SpecializationRepo } from 'src/specialization/specialization.repo';

@Module({
  controllers: [FeatureController],
  providers: [FeatureService, PrismaService, FeatureRepo, SubDepartmentRepo, RoomRepo, SpecializationRepo],
})
export class FeatureModule { }
