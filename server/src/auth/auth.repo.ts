import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Employee, Prisma, User } from '@prisma/client';

@Injectable()
export class AuthRepo extends PrismaGenericRepo<User> {
  constructor(private prismaService: PrismaService) {
    super('user', prismaService);
  }

  async getByUsername(
    username: string,
  ): Promise<User & { employee: Employee }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
        include: { employee: { include: { person: true, department: true } } },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async update(
    username: string,
    item: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    try {
      const res = await this.prismaService.user.update({
        where: { username },
        data: { ...(item as any) },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}
