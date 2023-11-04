import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Employee, User } from '@prisma/client';

@Injectable()
export class AuthRepo extends PrismaGenericRepo<User> {
  constructor(private prismaService: PrismaService) {
    super('user', prismaService);
  }

  async getByUsername(username: string): Promise<User & { employee: Employee }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
        include: { employee: true },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
