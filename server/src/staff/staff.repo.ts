import { PrismaGenericRepo } from "../shared/services/data-service/prisma-service/prisma-generic.repo";
import { Injectable } from '@nestjs/common';
import { PrismaService } from "../shared/services/data-service/prisma-service/prisma.service";
import { Prisma, Staff } from "@prisma/client";

@Injectable()
export class StaffRepo extends PrismaGenericRepo<Staff> {

    constructor(private prismaService: PrismaService) {
        super('staff', prismaService);
    }

    getAll(
        skip?: number,
        take?: number,
        cursor?: Prisma.StaffWhereUniqueInput,
        where?: Prisma.StaffWhereInput,
        orderBy?: Prisma.StaffOrderByWithRelationInput,
    ): Promise<Staff[]> {
        return this.prismaService.staff.findMany({ skip, take, cursor, where, orderBy });
    }
}