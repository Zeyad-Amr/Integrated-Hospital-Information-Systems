import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeRepo } from './employee.repo';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepo: EmployeeRepo,
    private authService: AuthService,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto, creatorId: string) {
    try {
      const username = await this.authService.generateUsername(
        createEmployeeDto.personalData.firstName,
      );
      const randomPassword = this.authService.generatePassword(5);
      const password = await this.authService.hashPassword(randomPassword);
      createEmployeeDto.auth = {
        username,
        password,
      };
      const newEmployee = await this.employeeRepo.createEmployee(
        createEmployeeDto,
        creatorId,
      );
      return { ...newEmployee, auth: { username, randomPassword } };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      
      return await this.employeeRepo.getAll();
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
