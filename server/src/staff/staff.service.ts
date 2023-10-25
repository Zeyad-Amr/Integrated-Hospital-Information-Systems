import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffRepo } from './staff.repo';
import { UserService } from '../auth/user.service';

@Injectable()
export class StaffService {
  constructor(
    private staffRepo: StaffRepo,
    private userService: UserService,
  ) { }
  // async create(createStaffDto: CreateStaffDto) {
  //   try {
  //     createStaffDto.password = await this.userService.hashPassword(
  //       createStaffDto.password,
  //     );
  //     const newStaff = await this.staffRepo.create(createStaffDto);
  //     return newStaff;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async findAll() {
  //   try {
  //     return await this.staffRepo.getAll();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async findOne(id: string) {
  //   try {
  //     const staff = await this.staffRepo.getByID(id);
  //     return staff;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async update(id: string, updateStaffDto: UpdateStaffDto) {
  //   try {
  //     const staff = await this.staffRepo.update(id, updateStaffDto);
  //     return staff;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async delete(id: string) {
  //   try {
  //     await this.staffRepo.delete(id);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
