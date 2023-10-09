import { HttpError } from 'src/shared/Http-error';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import {
    HTTP_CONFLICT,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND,
} from 'src/shared/constants/http-codes';

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
            const res = this.prisma[this.modelName].findMany(skip,
                take,
                cursor,
                where,
                orderBy,);
            return res;
        } catch (error) {
            throw new HttpError('internal server error', HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    async getByID(id: any): Promise<T | null> {
        try {
            const res = await this.prisma[this.modelName].findUniqueOrThrow({
                where: { id },
            });
            return res;
        } catch (error) {
            if (error.code === 'P2025')
                throw new HttpError('not found', HTTP_NOT_FOUND);

            throw new HttpError('internal server error', HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    create = async (item: Omit<T, 'id'>): Promise<T> => {
        try {
            const res = this.prisma[this.modelName].create({
                data: item as any,
            });
            return res;
        } catch (error) {
            if (error.code === 'P2002')
                throw new HttpError('staff member already exists', HTTP_CONFLICT);

            throw new HttpError('internal server error', HTTP_INTERNAL_SERVER_ERROR);
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
            if (error.code === 'P2025')
                throw new HttpError('not found', HTTP_NOT_FOUND);
            throw new HttpError('internal server error', HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const deletedObjects = await this.prisma[this.modelName].deleteMany({
                where: {
                    id,
                },
            });
            if (deletedObjects.count === 0)
                throw new HttpError('not found', HTTP_NOT_FOUND);
        } catch (error) {
            throw error;
        }
    }
}
