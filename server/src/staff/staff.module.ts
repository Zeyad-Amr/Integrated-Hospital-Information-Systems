import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { StaffRepo } from './staff.repo';
import { PrismaModule } from '../shared/services/prisma-client/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [StaffController],
  providers: [
    StaffService,
    StaffRepo,
    PrismaService,
  ],
})
export class StaffModule { }
