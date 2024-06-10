import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepo } from './employee.repo';
import { AuthService } from '../auth/auth.service';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { Sorting } from 'src/shared/decorators/order.decorator';
import { Filter } from 'src/shared/decorators/filters.decorator';


export interface CustomFilters {
  roleId: number;

  SSN: string;

  name: string;

  email: string;

  phone: string;
}
@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepo: EmployeeRepo,
    private authService: AuthService,
  ) { }
  async create(createEmployeeDto: CreateEmployeeDto, creatorId: string) {
    try {
      const auth: { username?: string; password?: string; email?: string } = {};
      auth.username = createEmployeeDto.auth.username;

      if (!createEmployeeDto.auth.password) {
        auth.password = this.authService.generateRandom(5);
      } else {
        auth.password = createEmployeeDto.auth.password;
      }
      createEmployeeDto.auth.password = await this.authService.hashPassword(
        auth.password,
      );
      const newEmployee = await this.employeeRepo.createEmployee(
        createEmployeeDto,
        creatorId,
      );
      auth.email = createEmployeeDto.auth.email;
      return { ...newEmployee, auth };
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: Pagination, sort: Sorting, filters: Array<Filter>, customFilters?: CustomFilters) {
    try {
      return await this.employeeRepo.findAll(pagination, sort, filters, customFilters);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const employee = await this.employeeRepo.getByID(id);
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.employeeRepo.update(id, updateEmployeeDto);
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.employeeRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}


