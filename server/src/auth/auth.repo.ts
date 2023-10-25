import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import {  User } from '@prisma/client';

@Injectable()
export class UserRepo extends PrismaGenericRepo<User> {
  constructor(private prismaService: PrismaService) {
    super('user', prismaService);
  }

  // async getByUsername(username: string): Promise<User & { staff: Staff }> {
  //   try {
  //     const user = await this.prismaService.user.findUnique({
  //       where: {
  //         username,
  //       },
  //       include: { staff: true },
  //     });
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
