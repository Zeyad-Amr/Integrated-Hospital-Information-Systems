import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from './department.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('department')
@ApiUnauthorizedResponse({ description: 'No token provided' })
@ApiBearerAuth()
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Public()
  @ApiOperation({ summary: 'get all departments' })
  @ApiOkResponse({ description: 'get all departments' })
  @Get()
  findAll() {
    return this.departmentService.findAll();
  }
}
