import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Prisma, Staff, User } from '@prisma/client';

interface CreateStaff extends Omit<Staff, 'id'> {
  username: User['username'];
  password: User['password'];
}

@Injectable()
export class StaffRepo extends PrismaGenericRepo<Staff> {
  constructor(private prismaService: PrismaService) {
    super('staff', prismaService);
  }

  async create(item: CreateStaff): Promise<Staff> {
    try {
      const { username, password, ...personalData } = item
      const res = await this.prismaService.staff.create({
        data: {
          ...personalData,
          user: {
            create: {
              username,
              password
            }
          }
        },
      });
      return res;
    } catch (error) {
      throw error
    }
  };

  async getAll(
    skip?: number,
    take?: number,
    cursor?: Prisma.StaffWhereUniqueInput,
    where?: Prisma.StaffWhereInput,
    orderBy?: Prisma.StaffOrderByWithRelationInput,
  ): Promise<Staff[]> {
    // why not using the generic one
    try {
      return this.prismaService.staff.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw error
    }
  }
}
