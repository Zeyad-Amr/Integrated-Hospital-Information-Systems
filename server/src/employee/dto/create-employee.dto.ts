import { ApiProperty } from '@nestjs/swagger';
import {
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
    example: 'EMPLOYEE',
  })
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @ApiProperty({
    type: String,
    example: 'MORNING12',
  })
  @IsNotEmpty()
  @IsInt()
  shiftId: number;

  @ApiProperty({
    type: String,
    example: '561f2a03-b28b-4080-b83a-583cc985cf52',
  })
  @IsNotEmpty()
  @IsUUID()
  departmentId: string;
}


export class CustomFilters {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  departmentId: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  roleId: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  SSN: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  email: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  phone: string;
}