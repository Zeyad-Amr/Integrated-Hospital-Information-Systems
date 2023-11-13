import { PaginatedResource } from 'src/shared/types/paginated.resource';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { getWhere } from 'src/shared/util.functions.ts/get.where.filter';
import { getOrder } from 'src/shared/util.functions.ts/get.order';
@Injectable()
export class PrismaGenericRepo<T> {
  constructor(
    private modelName: string,
    private prisma: PrismaService,
  ) {
    this.modelName = modelName;
  }

  async getAll(
    args?: {
      paginationParams?: Pagination,
      filters?: Array<Filter>,
      sort?: Sorting,
      include?: any,
      select?: any,
      additionalWhereConditions?: Array<any>,
    }): Promise<PaginatedResource<T>> {
    try {
      const whereCondition = getWhere(args.filters, args.additionalWhereConditions)
      const order: any = getOrder(args.sort)
      const res = await this.prisma.$transaction(async (tx) => {
        const count = await tx[this.modelName].count({ where: whereCondition });
        const visits = await tx[this.modelName].findMany({
          where: whereCondition,
          orderBy: order,
          skip: args?.paginationParams?.offset ? args.paginationParams.offset : undefined,
          take: args?.paginationParams?.limit ? args.paginationParams.limit : undefined,
          include: args?.include,
          select: args?.select
        })
        return { count, visits }
      })

      return { total: res.count, items: res.visits, page: args.paginationParams?.page, size: res.visits.length };

    } catch (error) {
      throw error;
    }
  }
  async getByID(id: any): Promise<T | null> {
    try {
      const res = await this.prisma[this.modelName].findUniqueOrThrow({
        where: { id },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    try {
      const res = await this.prisma[this.modelName].create({
        data: item as any,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }


  async update(
    id: string,
    item: Omit<T, 'id' | 'createdAt'>,
  ): Promise<T | null> {
    try {
      const res = await this.prisma[this.modelName].update({
        where: { id },
        data: { ...(item as any) },
      });
      return res;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
}
