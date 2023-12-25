import { PrismaGenericRepo } from '../shared/services/prisma-client/prisma-generic.repo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma-client/prisma.service';
import { Employee, PersonType, Prisma } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';
import { PaginatedResource } from 'src/shared/types/paginated.resource';

@Injectable()
export class EmployeeRepo extends PrismaGenericRepo<any> {
  constructor(private prismaService: PrismaService) {
    super('employee', prismaService);
  }

  async createEmployee(
    item: CreateEmployeeDto,
    creatorId: string,
  ): Promise<Employee> {
    try {
      const { auth, person, roleId, shiftId, departmentId } = item;
      const { verificationMethodId, genderId, ...personData } = person
      const employee = await this.prismaService.employee.create({
        data: {
          role: { connect: { id: roleId } },
          shift: { connect: { id: shiftId } },
          department: {
            connect: {
              id: departmentId,
            },
          },
          auth: { create: { ...auth } },
          person: {
            connectOrCreate: {
              where: { SSN: person.SSN },
              create: {
                ...personData,
                verificationMethod: { connect: { id: verificationMethodId } },
                gender: { connect: { id: genderId } },
                type: PersonType.EMPLOYEE
              },
            },
          },
          createdByEmployee: {
            connect: {
              id: creatorId,
            },
          },
        },
        include: this.includeObj,
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, item: UpdateEmployeeDto): Promise<any> {
    try {
      const { roleId, shiftId, departmentId, personalData, auth } = item;

      const employee = await this.prismaService.employee.update({
        where: { id },
        data: {
          role: { connect: { id: roleId } },
          shift: { connect: { id: shiftId } },
          department: {
            update: {
              id: departmentId,
            },
          },
          person: {
            update: {
              data: {
                ...personalData,
              },
            },
          },
          auth: {
            update: {
              ...auth,
            },
          },
        },
        include: { person: true },
      });
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async getByID(id: string): Promise<Employee> {
    try {
      const res = await this.prismaService.employee.findUniqueOrThrow({
        where: { id },
        include: this.includeObj,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  findAll(
    pagination: Pagination,
    sort: Sorting,
    filters: Array<Filter>,
  ): Promise<PaginatedResource<Employee>> {
    try {
      return this.getAll({
        paginationParams: pagination,
        filters,
        sort,
        include: this.includeObj,
      });
    } catch (error) {
      throw error;
    }
  }

  private includeObj: Prisma.EmployeeInclude = {
    person: { include: { verificationMethod: true, gender: true } },
    department: true,
    auth: {
      select: {
        username: true,
        email: true,
      },
    },
    role: true,
    shift: true,
  };
}
