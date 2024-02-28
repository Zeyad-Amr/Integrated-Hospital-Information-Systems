import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { handleError } from 'src/shared/http-error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';


@Public()
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    try {
      return this.roleService.create(createRoleDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.roleService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.roleService.findOne(+id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    try {
      return this.roleService.update(+id, updateRoleDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.roleService.remove(+id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
