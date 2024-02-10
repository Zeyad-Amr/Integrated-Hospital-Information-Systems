import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepo } from './role.repo';

@Injectable()
export class RoleService {
  constructor(private roleRepo: RoleRepo) { }
  create(createRoleDto: CreateRoleDto) {
    try {
      return this.roleRepo.create(createRoleDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.roleRepo.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.roleRepo.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return this.roleRepo.update(id, updateRoleDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.roleRepo.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
