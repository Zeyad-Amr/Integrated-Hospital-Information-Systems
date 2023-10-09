import { PrismaService } from "./prisma.service";
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaGenericRepo<T>  {
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
        orderBy?: any
    ): Promise<T[]> {
        return this.prisma[this.modelName].findMany();
    }
    async get(id: any): Promise<T | null> {
        return await this.prisma[this.modelName].findUniqueOrThrow({
            where: { id },
        });
    }

    create = async (item: Omit<T, 'id'>): Promise<T> => {
        console.log(this.modelName);

        return await this.prisma[this.modelName].create({
            data: item as any,
        });
    }

    async update(id: string, item: Omit<T, 'id'>): Promise<T | null> {
        return await this.prisma[this.modelName].update({
            where: { id },
            data: item as any,
        });
    }
    async delete(id: string): Promise<void> {
        await this.prisma.staff.delete({
            where: {
                id
            }
        });
    }

}