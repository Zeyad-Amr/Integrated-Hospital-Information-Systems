import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionRepo } from './permission.repo';

@Injectable()
export class PermissionService {
  constructor(private permissionRepo: PermissionRepo) { }
  create(createPermissionDto: CreatePermissionDto) {
    try {
      return this.permissionRepo.create(createPermissionDto);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.permissionRepo.findAll();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
      return this.permissionRepo.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      return this.permissionRepo.update(id, updatePermissionDto);
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
      return this.permissionRepo.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
