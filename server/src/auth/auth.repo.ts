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
  ) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
        include: { employee: { include: { person: true, department: true, role: true, shift: true } } },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserPermissions(username: string) {
    try {
      return await this.prismaService.user.findUnique(
        {
          where: { username: username }, include: {
            employee: {
              include: {
                role: {
                  include: {
                    Permissions: {
                      include: {
                        feature: true,
                      }
                    }
                  }
                }
              }
            }
          }
        },
      )

    } catch (error) {

    }
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
