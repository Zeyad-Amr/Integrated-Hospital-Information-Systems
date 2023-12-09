import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaModule } from '../shared/services/prisma-client/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { EmployeeRepo } from './employee.repo';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepo, PrismaService],
})
export class EmployeeModule {}
