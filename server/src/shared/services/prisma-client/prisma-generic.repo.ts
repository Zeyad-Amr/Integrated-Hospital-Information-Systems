import { handleError } from '../../http-error';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaGenericRepo<T> {
  constructor(
    private modelName: string,
    private prisma: PrismaService,
  ) {
    this.modelName = modelName;
  }

  async getAll(
    skip?: number,
    take?: number,
    cursor?: any,
    where?: any,
    orderBy?: any,
  ): Promise<T[]> {
    try {
      const res = this.prisma[this.modelName].findMany(
        skip,
        take,
        cursor,
        where,
        orderBy,
      );
      return res;
    } catch (error) {
      throw handleError(error);
    }
  }
  async getByID(id: any): Promise<T | null> {
    try {
      const res = await this.prisma[this.modelName].findUniqueOrThrow({
        where: { id },
      });
      return res;
    } catch (error) {
      throw handleError(error);
    }
  }

  create = async (item: Omit<T, 'id'>): Promise<T> => {
    try {
      const res = await this.prisma[this.modelName].create({
        data: item as any,
      });
      return res;
    } catch (error) {
      throw handleError(error);
    }
  };

  async update(id: string, item: Omit<T, 'id'>): Promise<T | null> {
    try {
      const res = await this.prisma[this.modelName].update({
        where: { id },
        data: item as any,
      });
      return res;
    } catch (error) {
      throw handleError(error);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prisma[this.modelName].delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw handleError(error);
    }
  }
}
