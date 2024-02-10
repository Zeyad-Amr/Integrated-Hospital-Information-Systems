import { PartialType } from '@nestjs/swagger';
import { CreateSubdepartmentDto } from './create-subdepartment.dto';

export class UpdateSubdepartmentDto extends PartialType(CreateSubdepartmentDto) {}
