import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Employee, Prisma } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeRepo extends PrismaGenericRepo<any> {
    constructor(private prismaService: PrismaService) {
        super('employee', prismaService);
    }

    async createEmployee(item: CreateEmployeeDto, creatorId: string): Promise<Employee> {
        try {
            const { auth, role, personalData } = item;
            const employee = await this.prismaService.employee.create({
                data: {
                    role,
                    user: { create: { ...auth } },
                    person: {
                        connectOrCreate: {
                            where: { SSN: personalData.SSN },
                            create: {
                                ...personalData
                            }
                        }
                    },
                    createdByEmployee: {
                        connect: {
                            id: creatorId
                        }
                    }
                },
                include: this.includeObj
            });
            return employee;
        } catch (error) {
            throw error;
        }
    }
    async update(id: string, item: UpdateEmployeeDto): Promise<any> {
        try {
            const { auth, role, personalData } = item;

            const employee = await this.prismaService.employee.update({
                where: { id },
                data: {
                    role,
                    user: { update: { ...auth } },
                    person: {
                        update: {
                            data: {
                                ...personalData
                            }
                        }
                    },
                },
                include: { person: true, }
            });
            return employee
        } catch (error) {
            throw error;
        }
    }

    async getByID(id: string): Promise<Employee> {
        try {
            const res = await this.prismaService.employee.findUniqueOrThrow({
                where: { id },
                include: this.includeObj
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    getAll(): Promise<Employee[]> {
        try {
            const res = this.prismaService.employee.findMany({
                include: this.includeObj
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    private includeObj: Prisma.EmployeeInclude = { person: true }

}
