import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AuthDataDto } from '../../auth/dto/auth-data.dto';
import { CreatePersonDto } from 'src/person/dto/create-person.dto';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty({ type: CreatePersonDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePersonDto)
  person: CreatePersonDto;

  @ApiProperty({ type: AuthDataDto, required: true })
  @IsObject()
  @ValidateNested()
  @Type(() => AuthDataDto)
  auth: AuthDataDto;

  @ApiProperty({
    type: String,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @ApiProperty({
    type: String,
    example: [1,2,3],
  })
  @IsArray()
  @IsInt({ each: true })
  suDepartmentIds: number[];

  @ApiProperty({
    type: String,
    example: 'MORNING12',
  })
  @IsNotEmpty()
  @IsInt()
  shiftId: number;
}


