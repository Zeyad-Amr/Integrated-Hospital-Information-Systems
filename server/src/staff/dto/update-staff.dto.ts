import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create-staff.dto';
import { IsEmail, IsMobilePhone, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @ApiProperty({
    type: String,
    description: 'staff name (optional field)',
    example: 'Raouf',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    description: 'staff SSN (optional field)',
    example: '30003106108898',
  })
  @IsOptional()
  ssn: string;

  @ApiProperty({
    type: String,
    description: 'staff email (optional field)',
    example: 'raouf@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'staff phone (optional field)',
    example: '01098157733',
  })
  @IsOptional()
  @IsMobilePhone()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'staff role (optional field)',
    example: 'receptionist',
  })
  @IsOptional()
  role: string;
}
