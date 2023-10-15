import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

export class CreateStaffDto extends LoginUserDto {

  @ApiProperty({
    type: String,
    description: 'staff name (required field)',
    example: 'Raouf',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'staff SSN (required field)',
    example: '30003106108898',
  })
  @IsNotEmpty()
  @IsString()
  ssn: string;

  @ApiProperty({
    type: String,
    description: 'staff email (required field)',
    example: 'raouf@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'staff phone (required field)',
    example: '01098157733',
  })
  @IsNotEmpty()
  @IsMobilePhone()
  @IsString()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'staff role (optional field)',
    example: 'receptionist',
  })
  @IsOptional()
  role: string;
}
