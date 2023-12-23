import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';

@Injectable()
export class DepartmentRepo extends PrismaGenericRepo<any> {
  constructor(private prismaService: PrismaService) {
    super('department', prismaService);
  }
}
